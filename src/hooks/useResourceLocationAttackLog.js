import { useContractRead } from "wagmi";
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';

export default function useResourceLocationAttackLog(resourceLocation, gangId) {
    const {
        data,
        isError,
        isLoading
    } = useContractRead({
        abi: LocTemplateResourceAbi,
        address: resourceLocation,
        functionName: 'viewOnly_getAllAttackLog',
        args: [],
        watch: true,
        enabled: !!resourceLocation
    });
    
    const attackLog = !!data ? data : []
    return attackLog
}