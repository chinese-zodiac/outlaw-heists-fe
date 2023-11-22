import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';
import { ADDRESS_ZERO } from "../constants/addresses";
const contractReadDataToBn = (item) => {
    if (item?.status == 'success') {
        return BigNumber.from(item?.result);
    } else {
        return BigNumber.from(0);
    }
}
const contractReadDataToBool = (item) => {
    if (item?.status == 'success') {
        return item?.result;
    } else {
        return false;
    }
}
export default function useResourceLocationGangInfo(resourceLocation, gangId) {
    const contractBase = {
        abi: LocTemplateResourceAbi,
        address: resourceLocation,
        args: [gangId?.toString()]
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
        gangProdDaily: contractReadDataToBn(data?.[0]),
        gangPower: contractReadDataToBn(data?.[1]),
        gangLastAttack: contractReadDataToBn(data?.[2]),
        gangAttackCooldown: contractReadDataToBn(data?.[3]),
        pendingResources: contractReadDataToBn(data?.[4]),
        gangPull: contractReadDataToBn(data?.[5]),
        gangResourcesPerDay: contractReadDataToBn(data?.[6]),
        gangDestination: data?.[7]?.status == "success" ? data?.[7]?.result : ADDRESS_ZERO,
        isGangPreparingToMove: contractReadDataToBool(data?.[8]),
        isGangReadyToMove: contractReadDataToBool(data?.[9]),
        isGangWorking: contractReadDataToBool(data?.[10]),
        whenGangIsReadyToMove: contractReadDataToBn(data?.[11])
    }
    return { ...resourceLocationGangInfo }
}
