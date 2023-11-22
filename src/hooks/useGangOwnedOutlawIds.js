import { utils } from 'ethers';
import { useContractRead, useContractReads } from "wagmi";
import EntityStoreERC721Abi from "../abi/EntityStoreERC721.json";
import { ADDRESS_ENTITY_STORE_ERC721, ADDRESS_GANGS, ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

export function useGangOwnedOutlawIdsMulti(nftIds) {
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: nftIds?.map((id) => ({
            abi: EntityStoreERC721Abi,
            address: ADDRESS_ENTITY_STORE_ERC721,
            functionName: 'viewOnly_getAllStoredERC721',
            args: [ADDRESS_GANGS, id?.toString(), ADDRESS_OUTLAWS_NFT],
        })),
        watch: true,
        enabled: !!nftIds && nftIds.length > 0
    });

    let allSuccess = true;
    const gangIdToOutlawIds = nftIds?.reduce((prev, id, i) => {
        if (!!data && data[i]?.status == 'success') {
            return ({ ...prev, [id?.toString()]: !isError && !isLoading && !!data[i] ? data[i]?.result.map((id) => id?.toString()) : [] })
        } else {
            allSuccess = false;
            return ({ ...prev })
        }
    },
        {});
    if (!allSuccess) console.log('useGangOwnedOutlawIdsMulti FAIL');

    return { gangIdToOutlawIds };

}

export default function useGangOwnedOutlawIds(nftId) {

    const {
        data: outlawIdsData,
        isError: outlawIdsIsError,
        isLoading: outlawIdsIsLoading,
    } = useContractRead({
        abi: EntityStoreERC721Abi,
        address: ADDRESS_ENTITY_STORE_ERC721,
        functionName: 'viewOnly_getAllStoredERC721',
        args: [ADDRESS_GANGS, nftId?.toString(), ADDRESS_OUTLAWS_NFT],
        watch: true,
        enabled: !!nftId || nftId == 0
    });

    const outlawIds =
        !outlawIdsIsLoading && !outlawIdsIsError
            ? outlawIdsData?.map((id) => id.toString()) ?? []
            : [];


    return { gangOwnedOutlawIds: outlawIds, gangOwnedOutlawCount: Number(outlawIds.length) }
}