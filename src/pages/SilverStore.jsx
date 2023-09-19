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
import { LOCATION_TOWN_SQUARE } from '../constants/locations';

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
          backgroundImage: "url('./images/PAPERTEXTURE.png')",
          backgroundSize: '500px',
          paddingBottom: '50px',
        }}
      >
        <LocationTitle>SILVER STORE</LocationTitle>
        <LocationContentArea
          sx={{
            paddingTop: '0.75em',
          }}
          backgroundImage={'./images/silverstore.png'}
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
          <Box
            sx={{
              display: 'inline-block',
              backgroundImage: "url('./images/MAP-BG.png')",
              backgroundSize: '100% 100%',
              width: '12.5em',
              textAlign: 'center',
              color: 'black',
              padding: '1em',
              marginBottom: '1em',
            }}
          >
            <Typography sx={{ fontSize: '2em' }}>MAP</Typography>
            <Typography sx={{ fontSize: '1.2em', textTransform: 'uppercase' }}>
              📍 Silver Store
            </Typography>
            <MoveButton
              sx={{ marginBottom: '0.4em' }}
              destinationAddress={LOCATION_TOWN_SQUARE}
              destinationName="TOWN SQUARE"
              gangId={activeGangId?.toString()}
              destinationAbout="Meet up with your Outlaws and Bandits in the Town Square. Equip and uneqip your Outlaws and Bandits with your Wallet and Gang."
            >
              Town Square
            </MoveButton>
            <MoveButton isLocked={true}>Red Canyons</MoveButton>
          </Box>
        </LocationContentArea>
        <StatsArea {...{ accountGangIdArray }} />
        <TgCommentBox
          dataTelegramDiscussion="banditlsdt/4402"
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
