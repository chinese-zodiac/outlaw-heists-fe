import { useContractReads } from "wagmi";
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';

export default function useResourceLocationGangInfo(resourceLocation, gangId) {
    const contractBase = {
        abi: LocTemplateResourceAbi,
        address: resourceLocation,
        args: [gangId]
    }
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: [
            {
                ...contractBase,
                functionName: 'gangProdDaily'
            },
            {
                ...contractBase,
                functionName: 'gangPower'
            },
            {
                ...contractBase,
                functionName: 'gangLastAttack'
            },
            {
                ...contractBase,
                functionName: 'gangAttackCooldown'
            },
            {
                ...contractBase,
                functionName: 'pendingResources'
            },
            {
                ...contractBase,
                functionName: 'gangPull'
            },
            {
                ...contractBase,
                functionName: 'gangResourcesPerDay'
            },
            {
                ...contractBase,
                functionName: 'gangDestination'
            },
            {
                ...contractBase,
                functionName: 'isGangPreparingToMove'
            },
            {
                ...contractBase,
                functionName: 'isGangReadyToMove'
            },
            {
                ...contractBase,
                functionName: 'isGangWorking'
            },
            {
                ...contractBase,
                functionName: 'whenGangIsReadyToMove'
            },
        ],
        watch: true,
        enabled: !!gangId && !!resourceLocation
    });

    const resourceLocationGangInfo = {
        gangProdDaily: data?.[0],
        gangPower: data?.[1],
        gangLastAttack: data?.[2],
        gangAttackCooldown: data?.[3],
        pendingResources: data?.[4],
        gangPull: data?.[5],
        gangResourcesPerDay: data?.[6],
        gangDestination: data?.[7],
        isGangPreparingToMove: data?.[8],
        isGangReadyToMove: data?.[9],
        isGangWorking: data?.[10],
        whenGangIsReadyToMove: data?.[11]
    }
    return { ...resourceLocationGangInfo }
}