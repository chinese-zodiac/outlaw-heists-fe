import { useContractRead, useContractReads } from "wagmi";
import ILocationControllerAbi from "../abi/ILocationController.json";
import { ADDRESS_GANGS, ADDRESS_LOCATION_CONTROLLER, ADDRESS_ZERO } from "../constants/addresses";
import { LOCATION_NAMES } from "../constants/locationNames";

export function useGangLocationMulti(gangIds) {
    const {
        data,
        isError,
        isLoading
    } = useContractReads({
        contracts: gangIds.map((id) => ({
            abi: ILocationControllerAbi,
            address: ADDRESS_LOCATION_CONTROLLER,
            functionName: 'getEntityLocation',
            args: [ADDRESS_GANGS, id],
        })),
        watch: true
    });

    const locations = gangIds.reduce((prev, id, i) =>
    ({
        ...prev, [id]: !isError && !isLoading ? ({
            address: data[i],
            name: LOCATION_NAMES[data[i]]
        }) : ({
            address: ADDRESS_ZERO,
            name: ""
        })
    }),
        {});

    return locations;
}

export default function useGangLocation(gangId) {
    const {
        data: getLocationData,
        isError: getLocationIsError,
        isLoading: getLocationIsLoading,
    } = useContractRead({
        abi: ILocationControllerAbi,
        address: ADDRESS_LOCATION_CONTROLLER,
        functionName: 'getEntityLocation',
        args: [ADDRESS_GANGS, gangId],
        watch: true,
        enabled: !!gangId || gangId == 0
    });

    const location =
        !getLocationIsLoading && !getLocationIsError && !!getLocationData
            ? ({
                address: getLocationData,
                name: LOCATION_NAMES[getLocationData]
            })
            : ({
                address: ADDRESS_ZERO,
                name: ""
            });

    return location;
}