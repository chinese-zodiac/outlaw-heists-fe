import { utils } from 'ethers';
import { useAccount, useContractRead, useContractReads } from "wagmi";
import IERC721Enumerable from "../abi/IERC721Enumerable.json";
const { formatEther, parseEther, Interface } = utils;

export default function useAccountNfts(nftAddress) {
    const { address, isConnecting, isDisconnected } = useAccount();

    const {
        data: nftCountData,
        isError: nftCountIsError,
        isLoading: nftCountIsLoading,
    } = useContractRead({
        abi: IERC721Enumerable,
        address: nftAddress,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        enabled: !!address
    });

    const nftCount =
        !nftCountIsLoading && !nftCountIsError
            ? Number(nftCountData?.toString() ?? 0)
            : 0;

    const {
        data: accountNftIdArrayData,
        isError: accountNftIdArrayIsError,
        isLoading: accountNftIdArrayIsLoading,
    } = useContractReads({
        contracts: nftCount > 0 ? [...new Array(nftCount)].map((val, i) => ({
            abi: IERC721Enumerable,
            address: nftAddress,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, i],
        })) : [],
        watch: true,
        enabled: !!address && nftCount > 0
    });
    const accountNftIdArray = accountNftIdArrayData ?? [];

    return { accountNftIdArray, accountNftCount: Number(nftCount?.toString()) }
}