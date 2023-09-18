import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import { readContract } from '@wagmi/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import OutlawsNftAbi from '../abi/OutlawsNft.json';
import { ADDRESS_OUTLAWS_NFT, ADDRESS_USTSD_NFT } from '../constants/addresses';
import { getIpfsJson, getIpfsUrl } from '../utils/getIpfsJson';

const gatewayTools = new IPFSGatewayTools();

let metadataFetchStatusAll = {};
const STATUS = {
    SUCCESS: "SUCCESS",
    PROCESSING: "PROCESSING",
    FAILURE: "FAILURE"
}

const fetchGenericMetadata = async (_nftSc, _nftId) => {
    //If undefined is accidentally passed, do nothing.
    if (!_nftId || !_nftSc) return;
    //Convert to string in case bignumber or number is passed.
    const nftId = _nftId.toString();
    //Uppercase in case the address is formatted differently
    const nftSc = _nftSc.toUpperCase();
    //Avoid refetching when possible, to limit number of requests to both the ipfs and eth providers.
    const metadataFetchStatus = metadataFetchStatusAll?.[nftSc];
    if (!!metadataFetchStatus && (!!metadataFetchStatus[nftId] && (metadataFetchStatus[nftId] == STATUS.SUCCESS || metadataFetchStatus[nftId] == STATUS.PROCESSING))) return;
    //If we dont have the array set for the smart contract, do so.
    if (!metadataFetchStatus) metadataFetchStatusAll[nftSc] = [];
    metadataFetchStatusAll[nftSc][nftId] = STATUS.PROCESSING;

    //Fetch the cid that contains most of the metadata for an Outlaw
    const ipfsCid = await readContract({
        address: _nftSc,
        abi: OutlawsNftAbi,
        functionName: 'jsonIpfsHash',
        args: [nftId],
    });

    //Validate the ipfs cid
    if (!gatewayTools.containsCID(ipfsCid).containsCid) {
        metadataFetchStatusAll[nftSc][nftId] = STATUS.FAILURE;
        return;
    }
    let metadata = await getIpfsJson(getIpfsUrl('ipfs://' + ipfsCid));
    metadata.ipfsCid = ipfsCid;
    metadata.nftId = nftId;
    metadata.nftSc = nftSc;

    //Basic metadata validation
    if (!metadata?.name || !metadata?.description || !metadata?.image || ipfsCid?.length != 46) {
        metadataFetchStatusAll[nftSc][nftId] = STATUS.FAILURE;
        return;
    }
    return metadata;
}

const useStore = create(
    persist((set, get) => ({
        loadoutSelectedGangIndex: 0,
        setLoadoutSelectedGangIndex: (gangId) => set({ loadoutSelectedGangIndex: gangId }),
        outlawMetadata: [],
        fetchOutlawMetadata: async (_nftId) => {

            const metadata = await fetchGenericMetadata(ADDRESS_OUTLAWS_NFT, _nftId);
            if (!metadata) return;

            const newOutlawMetadata = [...get().outlawMetadata];
            newOutlawMetadata[metadata.nftId] = metadata;
            metadataFetchStatusAll[metadata.nftSc][metadata.nftId] = STATUS.SUCCESS;
            return set((state) => ({ outlawMetadata: newOutlawMetadata }));
        },
        ustsdMetadata: [],
        fetchUstsdMetadata: async (_nftId) => {

            const metadata = await fetchGenericMetadata(ADDRESS_USTSD_NFT, _nftId);
            if (!metadata) return;

            const newUstsdMetadata = [...get().ustsdMetadata];
            newUstsdMetadata[metadata.nftId] = metadata;
            metadataFetchStatusAll[metadata.nftSc][metadata.nftId] = STATUS.SUCCESS;
            return set((state) => ({ ustsdMetadata: newUstsdMetadata }));
        }
    }), { name: "heist-storage-v0.0.4" })
);

export default useStore