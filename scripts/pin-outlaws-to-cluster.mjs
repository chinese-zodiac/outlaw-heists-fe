#!/usr/bin/env node
/**
 * Script to pin all Outlaw NFT IPFS hashes to a local IPFS cluster.
 * 
 * Usage:
 *   node scripts/pin-outlaws-to-cluster.mjs
 * 
 * Prerequisites:
 *   - IPFS daemon running locally
 *   - ipfs-cluster-ctl available in PATH
 */

import { ethers } from 'ethers';
import { execSync, spawn } from 'child_process';

// BSC RPC endpoint
const BSC_RPC = 'https://bsc-dataseed.binance.org/';

// Outlaws NFT contract address
const ADDRESS_OUTLAWS_NFT = '0x128Bf3854130B8cD23e171041Fc65DeE43a1c194';

// Minimal ABI for the functions we need
const OUTLAWS_ABI = [
  'function totalSupply() view returns (uint256)',
  'function jsonIpfsHash(uint256 tokenId) view returns (string)',
  'function tokenByIndex(uint256 index) view returns (uint256)'
];

// IPFS gateways to try when fetching metadata
const GATEWAYS = [
  'https://dweb.link/ipfs/',
  'https://w3s.link/ipfs/',
  'https://nftstorage.link/ipfs/',
  'https://cf-ipfs.com/ipfs/',
  'http://127.0.0.1:8080/ipfs/'  // Local gateway - fastest if you have content
];

// Extract CID from various IPFS URL formats
function extractCid(ipfsUrl) {
  if (!ipfsUrl) return null;
  
  // Handle ipfs:// protocol
  if (ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl.replace('ipfs://', '');
  }
  
  // Handle gateway URLs
  const match = ipfsUrl.match(/\/ipfs\/([a-zA-Z0-9]+)/);
  if (match) return match[1];
  
  // Handle bare CID
  if (ipfsUrl.match(/^(Qm[a-zA-Z0-9]{44}|bafy[a-zA-Z0-9]+)$/)) {
    return ipfsUrl;
  }
  
  return null;
}

// Fetch JSON from IPFS with gateway fallback
async function fetchIpfsJson(cid, retries = 3) {
  for (const gateway of GATEWAYS) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const url = `${gateway}${cid}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        // Try next gateway/attempt
      }
    }
  }
  return null;
}

// Pin a CID to the IPFS cluster
function pinToCluster(cid, name = '') {
  try {
    const nameArg = name ? `--name "${name}"` : '';
    execSync(`ipfs-cluster-ctl pin add ${cid} ${nameArg}`, { 
      stdio: 'pipe',
      timeout: 30000 
    });
    return true;
  } catch (err) {
    return false;
  }
}

// Check if ipfs-cluster-ctl is available
function checkClusterCtl() {
  try {
    execSync('ipfs-cluster-ctl --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🤠 Outlaw IPFS Cluster Pinner\n');
  
  // Check for ipfs-cluster-ctl
  if (!checkClusterCtl()) {
    console.error('❌ ipfs-cluster-ctl not found in PATH');
    console.log('   Make sure IPFS cluster is running and ipfs-cluster-ctl is accessible');
    process.exit(1);
  }
  console.log('✅ ipfs-cluster-ctl found\n');

  // Connect to BSC
  console.log('📡 Connecting to BSC...');
  const provider = new ethers.providers.JsonRpcProvider(BSC_RPC);
  const contract = new ethers.Contract(ADDRESS_OUTLAWS_NFT, OUTLAWS_ABI, provider);

  // Get total supply
  const totalSupply = await contract.totalSupply();
  console.log(`📊 Total Outlaws: ${totalSupply.toString()}\n`);

  const allCids = new Set();
  const metadataCids = [];
  const imageCids = [];
  const errors = [];

  console.log('🔍 Fetching IPFS hashes from blockchain...\n');

  // Process in batches to avoid rate limiting
  const BATCH_SIZE = 10;
  const total = totalSupply.toNumber();

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batchEnd = Math.min(i + BATCH_SIZE, total);
    const batchPromises = [];

    for (let j = i; j < batchEnd; j++) {
      batchPromises.push(
        (async () => {
          try {
            // Get token ID at this index
            const tokenId = await contract.tokenByIndex(j);
            const tokenIdNum = tokenId.toNumber();
            
            // Get metadata CID
            const metadataCid = await contract.jsonIpfsHash(tokenIdNum);
            
            if (metadataCid && metadataCid.length > 0) {
              const cid = extractCid(metadataCid) || metadataCid;
              metadataCids.push({ tokenId: tokenIdNum, cid });
              allCids.add(cid);

              // Fetch metadata to get image CID
              const metadata = await fetchIpfsJson(cid);
              if (metadata && metadata.image) {
                const imageCid = extractCid(metadata.image);
                if (imageCid) {
                  imageCids.push({ tokenId: tokenIdNum, cid: imageCid });
                  allCids.add(imageCid);
                }
              }
            }
            
            return { tokenId: tokenIdNum, success: true };
          } catch (err) {
            return { index: j, success: false, error: err.message };
          }
        })()
      );
    }

    const results = await Promise.all(batchPromises);
    const successCount = results.filter(r => r.success).length;
    const progress = Math.round((batchEnd / total) * 100);
    process.stdout.write(`\r   Progress: ${progress}% (${batchEnd}/${total}) - Batch success: ${successCount}/${results.length}`);
    
    results.filter(r => !r.success).forEach(r => errors.push(r));

    // Small delay between batches to be nice to the RPC
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n');
  console.log(`📋 Summary:`);
  console.log(`   - Metadata CIDs found: ${metadataCids.length}`);
  console.log(`   - Image CIDs found: ${imageCids.length}`);
  console.log(`   - Unique CIDs total: ${allCids.size}`);
  if (errors.length > 0) {
    console.log(`   - Errors: ${errors.length}`);
  }
  console.log('');

  // Pin all CIDs
  console.log('📌 Pinning to IPFS cluster...\n');
  
  let pinned = 0;
  let failed = 0;
  const cidArray = Array.from(allCids);

  for (let i = 0; i < cidArray.length; i++) {
    const cid = cidArray[i];
    const isMetadata = metadataCids.some(m => m.cid === cid);
    const name = isMetadata 
      ? `outlaw-metadata-${metadataCids.find(m => m.cid === cid)?.tokenId}`
      : `outlaw-image-${imageCids.find(m => m.cid === cid)?.tokenId}`;
    
    process.stdout.write(`\r   Pinning: ${i + 1}/${cidArray.length} - ${cid.substring(0, 12)}...`);
    
    if (pinToCluster(cid, name)) {
      pinned++;
    } else {
      failed++;
    }
  }

  console.log('\n');
  console.log('✅ Complete!');
  console.log(`   - Successfully pinned: ${pinned}`);
  if (failed > 0) {
    console.log(`   - Failed to pin: ${failed}`);
  }

  // Output CIDs to a file for reference
  const outputPath = './outlaw-ipfs-cids.json';
  const output = {
    generatedAt: new Date().toISOString(),
    totalOutlaws: total,
    metadataCids,
    imageCids,
    allUniqueCids: cidArray
  };
  
  await import('fs').then(fs => {
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  });
  console.log(`\n📄 CID list saved to: ${outputPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
