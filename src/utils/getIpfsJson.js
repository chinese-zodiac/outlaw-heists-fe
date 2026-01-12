import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import { memoize } from 'lodash';

const gatewayTools = new IPFSGatewayTools();
const gateways = [
    "https://dweb.link",
    "https://w3s.link",
    "https://nftstorage.link",
    "https://4everland.io",
    "https://cf-ipfs.com"
]

export const getIpfsUrl = (sourceUrl, cycle = 0) => {
    //console.log('gateway',gateways[cycle%gateways.length])
    return gatewayTools.convertToDesiredGateway(sourceUrl, gateways[cycle % gateways.length]);
}

const MAX_RETRIES = gateways.length * 2; // Try each gateway twice before giving up

export const getIpfsJson = memoize(async (sourceUrl) => {
    let s = window.localStorage;
    let item = JSON.parse(s.getItem(sourceUrl));
    if (item != null) return item;

    let cycle = 0;
    let isLoading = true;
    let lastError = null;
    
    while (isLoading && cycle < MAX_RETRIES) {
        try {
            const gatewayUrl = getIpfsUrl(sourceUrl, cycle);
            let result = await fetch(gatewayUrl);
            if (!result.ok) {
                throw new Error(`HTTP ${result.status}`);
            }
            item = await result.json();
            isLoading = false;
        } catch (err) {
            lastError = err;
            cycle++;
        }
    }
    
    if (isLoading) {
        console.error(`Failed to fetch IPFS content after ${MAX_RETRIES} attempts:`, sourceUrl, lastError);
        return null;
    }
    
    s.setItem(sourceUrl, JSON.stringify(item));
    return item;
})