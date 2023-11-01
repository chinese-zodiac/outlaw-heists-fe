
import { BigNumber } from "ethers";
import { useContractRead, useContractReads } from "wagmi";
import EntityStoreERC20Abi from "../abi/EntityStoreERC20.json";
import { ADDRESS_ENTITY_STORE_ERC20, ADDRESS_GANGS } from "../constants/addresses";

export function useGangOwnedERC20Multi(erc20Token, gangIds) {
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: gangIds.map((id) => ({
            abi: EntityStoreERC20Abi,
            address: ADDRESS_ENTITY_STORE_ERC20,
            functionName: 'getStoredER20WadFor',
            args: [ADDRESS_GANGS, id, erc20Token],
        })),
        watch: true
    })

    const gangBals = gangIds.reduce((prev, id, i) =>
        ({ ...prev, [id]: !isError && !isLoading ? data[i] : BigNumber.from(0) }),
        {});

    return gangBals;
}

export default function useGangOwnedERC20(erc20Token, gangId) {

    const {
        data,
        isError,
        isLoading
    } = useContractRead({
        abi: EntityStoreERC20Abi,
        address: ADDRESS_ENTITY_STORE_ERC20,
        functionName: 'getStoredER20WadFor',
        args: [ADDRESS_GANGS, gangId, erc20Token],
        watch: true,
        enabled: !!gangId || gangId == 0
    });

    return data || BigNumber.from(0);
}

export function useGangOwnedMultiERC20(erc20TokenArray, gangId) {
    const sc = {
        abi: EntityStoreERC20Abi,
        address: ADDRESS_ENTITY_STORE_ERC20,
        functionName: 'getStoredER20WadFor'
    }
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: erc20TokenArray?.map((erc20Token) => ({ args: [ADDRESS_GANGS, gangId, erc20Token], ...sc })),
        watch: true,
        enabled: !!erc20TokenArray && erc20TokenArray?.length > 0 && (!!gangId || gangId == 0)
    });

    const erc20Bals = !data ? [] : erc20TokenArray.reduce((prev, erc20Token, i) =>
        ({ ...prev, [erc20Token]: !isError && !isLoading ? data[i] : BigNumber.from(0) }),
        {});

    return erc20Bals;
}