import { BigNumber } from "ethers";
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
    if (!isError && !isLoading && !!data && !!data?.[0] && data?.[0]?.length > 0) {
        for (let i = 0; i < data[0].length; i++) {
            gangsPower.push({
                id: BigNumber.from(data[0][i]),
                bandits: BigNumber.from(data[1][i]),
                power: BigNumber.from(data[2][i]),
            })
        }
    }
    return { gangsPower }
}