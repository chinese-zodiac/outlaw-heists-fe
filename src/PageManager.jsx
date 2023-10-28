import { Typography } from '@mui/material';
import { useAccount } from 'wagmi';
import { ADDRESS_GANGS, ADDRESS_ZERO } from './constants/addresses';
import { LOCATION_NAMES } from './constants/locationNames';
import { LOCATION_TEMPLATES } from './constants/locationTemplates';
import {
  LOCATION_SILVER_STORE,
  LOCATION_TOWN_SQUARE,
} from './constants/locations';
import useAccountNfts from './hooks/useAccountNfts';
import useGangLocation from './hooks/useGangLocation';
import ResourceLocation from './pages/ResourceLocation';
import SilverStore from './pages/SilverStore';
import TownSquare from './pages/TownSquare';
import useStore from './store/useStore';

export default function PageManager() {
  const loadoutSelectedGangIndex = useStore(
    (state) => state.loadoutSelectedGangIndex
  );
  const { address, isConnecting, isDisconnected } = useAccount();

  const { accountNftIdArray: accountGangIdArray } =
    useAccountNfts(ADDRESS_GANGS);
  const activeGangId = accountGangIdArray[loadoutSelectedGangIndex];
  const activeGangLocation = useGangLocation(activeGangId);

  return (
    <>
      {activeGangLocation.address == LOCATION_SILVER_STORE && (
        <SilverStore {...{ activeGangId, accountGangIdArray }} />
      )}
      {LOCATION_TEMPLATES[activeGangLocation?.address ?? ADDRESS_ZERO] ==
        'RESOURCE' && (
        <ResourceLocation
          {...{
            activeGangId,
            accountGangIdArray,
            resourceLocationAddress: activeGangLocation.address,
          }}
        />
      )}
      {(activeGangLocation.address == LOCATION_TOWN_SQUARE ||
        !address ||
        !activeGangId) && (
        <TownSquare {...{ activeGangId, accountGangIdArray }} />
      )}
      {Object.keys(LOCATION_NAMES).indexOf(activeGangLocation?.address) == -1 &&
        !!address && (
          <>
            <Typography>LOADING... PLEASE WAIT...</Typography>
          </>
        )}
    </>
  );
}
