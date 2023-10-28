import { useContractReads } from "wagmi";
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';

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
        allFixedDestinations: data?.[0],
        totalPull: data?.[1],
        currentProdDaily: data?.[2],
        travelTime: data?.[3],
        attackCooldown: data?.[4],
        attackCostBps: data?.[5],
        victoryTransferBps: data?.[6]
    }
    return { ...resourceLocationGangInfo }
}