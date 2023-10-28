import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import GangBar from '../components/elements/GangBar';
import LocationTitle from '../components/elements/LocationTitle';
import MoveButton from '../components/elements/MoveButton';
import SilverDollarBarRemovable from '../components/elements/SilverDollarBarRemovable';
import SilverDollarPicker from '../components/elements/SilverDollarPicker';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import StatsArea from '../components/layouts/StatsArea';
import Map from '../components/styled/Map';
import { LOCATION_ABOUTS } from '../constants/locationAbouts';
import { LOCATION_CHATLINKS } from '../constants/locationChatlinks';
import {
  LOCATION_SILVER_STORE,
  LOCATION_TOWN_SQUARE,
} from '../constants/locations';

export default function SilverStore({ accountGangIdArray, activeGangId }) {
  const theme = useTheme();
  const [ustsdIdsToAdd, setUstsdIdsToAdd] = useState([]);
  const [ustsdIdsToRemove, setUstsdIdsToRemove] = useState([]);

  const toggleUstsdSelectedToAdd = useCallback(
    (nftId) => {
      setUstsdIdsToAdd((prevUstsdIds) => {
        if (!prevUstsdIds.includes(nftId)) {
          return [...prevUstsdIds, nftId];
        } else {
          return prevUstsdIds.filter((val) => val != nftId);
        }
      });
    },
    [setUstsdIdsToAdd]
  );

  const toggleUstsdSelectedToRemove = useCallback(
    (nftId) => {
      setUstsdIdsToRemove((prevUstsdIds) => {
        if (!prevUstsdIds.includes(nftId)) {
          return [...prevUstsdIds, nftId];
        } else {
          return prevUstsdIds.filter((val) => val != nftId);
        }
      });
    },
    [setUstsdIdsToRemove]
  );

  const deselectUstsdAll = useCallback(() => {
    setUstsdIdsToAdd([]);
    setUstsdIdsToRemove([]);
  });
  return (
    <>
      <HeaderBar />
      <Box
        css={{
          position: 'relative',
          backgroundColor: theme.palette.primary.dark,
          backgroundImage: "url('./images/WOODTEXTURE-SEAMLESS.svg')",
          backgroundSize: '512px',
          paddingBottom: '50px',
        }}
      >
        <LocationTitle>SILVER STORE</LocationTitle>
        <LocationContentArea
          sx={{
            paddingTop: '0.75em',
          }}
          backgroundImage={'./images/BACKGROUND-SILVERSTORE.svg'}
        >
          <SilverDollarPicker
            gangId={activeGangId?.toString()}
            toggleUstsdSelectedToAdd={toggleUstsdSelectedToAdd}
            ustsdIdsToAdd={ustsdIdsToAdd}
            toggleUstsdSelectedToRemove={toggleUstsdSelectedToRemove}
            ustsdIdsToRemove={ustsdIdsToRemove}
            deselectUstsdsAll={deselectUstsdAll}
          />
          <br />
          <SilverDollarBarRemovable
            gangId={activeGangId?.toString()}
            ustsdIdsToRemove={ustsdIdsToRemove}
            toggleUstsdSelectedToRemove={toggleUstsdSelectedToRemove}
          />
          <GangBar gangId={activeGangId} />
          <Map>
            <Typography sx={{ fontSize: '2em' }}>MAP</Typography>
            <Typography sx={{ fontSize: '1.2em', textTransform: 'uppercase' }}>
              📍 Silver Store
            </Typography>
            <MoveButton
              sx={{ marginBottom: '0.4em' }}
              destinationAddress={LOCATION_TOWN_SQUARE}
              destinationName="TOWN SQUARE"
              gangId={activeGangId?.toString()}
              destinationAbout={LOCATION_ABOUTS[LOCATION_TOWN_SQUARE]}
            >
              Town Square
            </MoveButton>
          </Map>
        </LocationContentArea>
        <StatsArea {...{ accountGangIdArray }} />
        <TgCommentBox
          dataTelegramDiscussion={LOCATION_CHATLINKS[LOCATION_SILVER_STORE]}
          sx={{
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em',
          }}
        />
        <FooterArea sx={{ zIndex: 4, position: 'relative' }} />
      </Box>
    </>
  );
}
