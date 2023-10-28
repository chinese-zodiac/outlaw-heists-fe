import { useContractRead } from "wagmi";
import ViewGangsPowerAbi from '../abi/ViewGangsPower.json';
import { ADDRESS_VIEW_GANGS_POWER } from "../constants/addresses";

export default function useViewGangsPower(resourceLocation) {

    const {
        data,
        isError,
        isLoading
    } = useContractRead({
        abi: ViewGangsPowerAbi,
        address: ADDRESS_VIEW_GANGS_POWER,
        functionName: 'viewOnly_localGangsPower',
        args: [resourceLocation],
        watch: true,
        enabled: !!resourceLocation
    });


    const gangsPower = [];

    if (!isError && !isLoading && !!data && data.gangIds.length > 0) {
        for (let i = 0; i < data.gangIds.length; i++) {
            gangsPower.push({
                id: data?.gangIds[i],
                bandits: data?.gangBandits[i],
                power: data?.gangPowers[i],
            })
        }
    }
    return { gangsPower }
}