import { useContractRead, useContractReads } from "wagmi";
import GangsAbi from "../abi/Gangs.json";
import { WordList1And2 } from "../constants/WordList1And2";
import { WordList3 } from "../constants/WordList3";
import { ADDRESS_GANGS } from "../constants/addresses";

function nameDataToName(getNameData) {
    return "The " + WordList1And2[getNameData.word1_.toString()] + " " +
        WordList1And2[getNameData.word2_.toString()] + " " +
        WordList3[getNameData.word3_.toString()]
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
            args: [id],
        })),
        watch: true
    })

    const names = gangIds.reduce((prev, id, i) =>
        ({ ...prev, [id]: !isError && !isLoading ? nameDataToName(data[i]) : "" }),
        {});

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
        args: [gangId],
        watch: true,
        enabled: !!gangId || gangId == 0
    });

    const name =
        !getNameIsLoading && !getNameIsError
            ? nameDataToName(getNameData)
            : "";

    return name;
}