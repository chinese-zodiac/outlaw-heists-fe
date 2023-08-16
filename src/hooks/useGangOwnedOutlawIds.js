import { utils } from 'ethers';
import { useContractRead } from "wagmi";
import EntityStoreERC721Abi from "../abi/EntityStoreERC721.json";
import { ADDRESS_ENTITY_STORE_ERC721, ADDRESS_GANGS, ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

export default function useGangOwnedOutlawIds(nftId) {

    const {
        data: outlawIdsData,
        isError: outlawIdsIsError,
        isLoading: outlawIdsIsLoading,
    } = useContractRead({
        abi: EntityStoreERC721Abi,
        address: ADDRESS_ENTITY_STORE_ERC721,
        functionName: 'viewOnly_getAllStoredERC721',
        args: [ADDRESS_GANGS, nftId, ADDRESS_OUTLAWS_NFT],
        watch: true,
        enabled: !!nftId || nftId == 0
    });

    const outlawIds =
        !outlawIdsIsLoading && !outlawIdsIsError
            ? Number(outlawIdsData?.toString() ?? 0)
            : 0;


    return { gangOwnedOutlawIds: outlawIdsData?.map((id) => id.toString()) ?? [], gangOwnedOutlawCount: Number(outlawIds?.toString()) }
}