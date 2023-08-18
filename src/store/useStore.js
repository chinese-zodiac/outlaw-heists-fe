import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import { readContract } from '@wagmi/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import OutlawsNftAbi from '../abi/OutlawsNft.json';
import { ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
import { getIpfsJson, getIpfsUrl } from '../utils/getIpfsJson';

const gatewayTools = new IPFSGatewayTools();

let outlawMetadataFetchStatus = [];
const STATUS = {
    SUCCESS: "SUCCESS",
    PROCESSING: "PROCESSING",
    FAILURE: "FAILURE"
}

const useStore = create(
    persist((set, get) => ({
        loadoutSelectedGangIndex: 0,
        setLoadoutSelectedGangIndex: (gangId) => set({ loadoutSelectedGangIndex: gangId }),
        outlawMetadata: [],
        fetchOutlawMetadata: async (_nftId) => {
            //If undefined is accidentally passed, do nothing.
            if (!_nftId) return;
            //Convert to string in case bignumber or number is passed.
            const nftId = _nftId.toString();
            //Avoid refetching when possible, to limit number of requests to both the ipfs and eth providers.
            if (!!outlawMetadataFetchStatus[nftId] && (outlawMetadataFetchStatus[nftId] == STATUS.SUCCESS || outlawMetadataFetchStatus[nftId] == STATUS.PROCESSING)) return;
            outlawMetadataFetchStatus[nftId] = STATUS.PROCESSING;

            //Fetch the cid that contains most of the metadata for an Outlaw
            const ipfsCid = await readContract({
                address: ADDRESS_OUTLAWS_NFT,
                abi: OutlawsNftAbi,
                functionName: 'jsonIpfsHash',
                args: [nftId],
            });

            //Validate the ipfs cid
            if (!gatewayTools.containsCID(ipfsCid).containsCid) {
                outlawMetadataFetchStatus[nftId] = STATUS.FAILURE;
                return;
            }
            let metadata = await getIpfsJson(getIpfsUrl('ipfs://' + ipfsCid));
            metadata.ipfsCid = ipfsCid;
            metadata.nftId = nftId;

            //Basic metadata validation
            if (!metadata?.name || !metadata?.description || !metadata?.image || ipfsCid?.length != 46) {
                outlawMetadataFetchStatus[nftId] = STATUS.FAILURE;
                return;
            }
            const newOutlawMetadata = [...get().outlawMetadata]
            newOutlawMetadata[nftId] = metadata;
            outlawMetadataFetchStatus[nftId] = STATUS.SUCCESS;
            return set((state) => ({ outlawMetadata: newOutlawMetadata }));
        }
    }), { name: "outlawMetadata-storage-v0.0.3" })
);

export default useStore