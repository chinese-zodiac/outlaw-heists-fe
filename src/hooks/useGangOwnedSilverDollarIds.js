import { utils } from 'ethers';
import { useContractRead, useContractReads } from "wagmi";
import EntityStoreERC721Abi from "../abi/EntityStoreERC721.json";
import { ADDRESS_ENTITY_STORE_ERC721, ADDRESS_GANGS, ADDRESS_USTSD_NFT } from '../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

export function useGangOwnedSilverDollarIdsMulti(nftIds) {
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: nftIds?.map((id) => ({
            abi: EntityStoreERC721Abi,
            address: ADDRESS_ENTITY_STORE_ERC721,
            functionName: 'viewOnly_getAllStoredERC721',
            args: [ADDRESS_GANGS, id, ADDRESS_USTSD_NFT],
        })),
        watch: true,
        enabled: !!nftIds && nftIds.length > 0
    });

    const gangIdToUstsdIds = nftIds?.reduce((prev, id, i) =>
        ({ ...prev, [id?.toString()]: !isError && !isLoading && !!data[i] ? data[i].map((id) => id?.toString()) : [] }),
        {});

    return { gangIdToUstsdIds };

}

export default function useGangOwnedSilverDollarIds(nftId) {

    const {
        data: ustsdIdsData,
        isError: ustsdIdsIsError,
        isLoading: ustsdIdsIsLoading,
    } = useContractRead({
        abi: EntityStoreERC721Abi,
        address: ADDRESS_ENTITY_STORE_ERC721,
        functionName: 'viewOnly_getAllStoredERC721',
        args: [ADDRESS_GANGS, nftId, ADDRESS_USTSD_NFT],
        watch: true,
        enabled: !!nftId || nftId == 0
    });

    const ustsdIds =
        !ustsdIdsIsLoading && !ustsdIdsIsError
            ? ustsdIdsData?.map((id) => id.toString()) ?? []
            : [];


    return { gangOwnedUstsdIds: ustsdIds, gangOwnedUstsdCount: Number(ustsdIds.length) }
}