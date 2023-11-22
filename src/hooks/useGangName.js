import { useContractRead, useContractReads } from "wagmi";
import GangsAbi from "../abi/Gangs.json";
import { WordList1And2 } from "../constants/WordList1And2";
import { WordList3 } from "../constants/WordList3";
import { ADDRESS_GANGS } from "../constants/addresses";

function nameDataToName(getNameData) {
    return WordList1And2[getNameData?.[0]?.toString()] + " " +
        WordList1And2[getNameData?.[1]?.toString()] + " " +
        WordList3[getNameData?.[2]?.toString()]
}

export function useGangNameMulti(gangIds) {
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: gangIds.map((id) => ({
            abi: GangsAbi,
            address: ADDRESS_GANGS,
            functionName: 'getName',
            args: [id?.toString()],
        })),
        watch: true
    });
    let allSuccess = true;
    const names = gangIds.reduce((prev, id, i) => {
        if (!!data && data[i]?.status == 'success') {
            return ({ ...prev, [id]: !isError && !isLoading ? nameDataToName(data[i]?.result) : "" })
        } else {
            allSuccess = false;
            return ({ ...prev })
        }
    },
        {});
    if (!allSuccess) console.log('useGangNameMulti FAIL');

    return names;
}

export default function useGangName(gangId) {
    const {
        data: getNameData,
        isError: getNameIsError,
        isLoading: getNameIsLoading,
    } = useContractRead({
        abi: GangsAbi,
        address: ADDRESS_GANGS,
        functionName: 'getName',
        args: [gangId?.toString()],
        watch: true,
        enabled: !!gangId || gangId == 0
    });

    const name =
        !getNameIsLoading && !getNameIsError && !!getNameData
            ? nameDataToName(getNameData)
            : "";

    return name;
}