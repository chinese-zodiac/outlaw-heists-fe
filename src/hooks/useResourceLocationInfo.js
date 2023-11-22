import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';

const contractReadDataToBn = (item) => {
    if (item?.status == 'success') {
        return BigNumber.from(item?.result);
    } else {
        return BigNumber.from(0);
    }
}
const contractReadDataToArray = (item) => {
    if (item?.status == 'success') {
        return item?.result;
    } else {
        return [];
    }
}

export default function useResourceLocationInfo(resourceLocation) {
    const contractBase = {
        abi: LocTemplateResourceAbi,
        address: resourceLocation,
        args: []
    }
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: [
            {
                ...contractBase,
                functionName: 'viewOnly_getAllFixedDestinations'
            },
            {
                ...contractBase,
                functionName: 'totalPull'
            },
            {
                ...contractBase,
                functionName: 'currentProdDaily'
            },
            {
                ...contractBase,
                functionName: 'travelTime'
            },
            {
                ...contractBase,
                functionName: 'attackCooldown'
            },
            {
                ...contractBase,
                functionName: 'attackCostBps'
            },
            {
                ...contractBase,
                functionName: 'victoryTransferBps'
            },
        ],
        watch: true,
        enabled: !!resourceLocation
    });

    const resourceLocationGangInfo = {
        allFixedDestinations: contractReadDataToArray(data?.[0]),
        totalPull: contractReadDataToBn(data?.[1]),
        currentProdDaily: contractReadDataToBn(data?.[2]),
        travelTime: contractReadDataToBn(data?.[3]),
        attackCooldown: contractReadDataToBn(data?.[4]),
        attackCostBps: contractReadDataToBn(data?.[5]),
        victoryTransferBps: contractReadDataToBn(data?.[6])
    }
    return { ...resourceLocationGangInfo }
}