import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { parseEther } from 'ethers/lib/utils.js';
import { useCallback, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import GangBarRemovable from '../components/elements/GangBarRemovable';
import LocationTitle from '../components/elements/LocationTitle';
import MoveButton from '../components/elements/MoveButton';
import OutlawPicker from '../components/elements/OutlawPicker';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import StatsArea from '../components/layouts/StatsArea';
import DialogError from '../components/styled/DialogError';
import { ADDRESS_BANDIT } from '../constants/addresses';
import { LOCATION_SILVER_STORE } from '../constants/locations';

const banditContract = {
  address: ADDRESS_BANDIT,
  abi: IERC20Abi,
};

export default function TownSquare({ accountGangIdArray, activeGangId }) {
  const theme = useTheme();

  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: banditBalData,
    isError: banditBalIsError,
    isLoading: banditBalIsLoading,
  } = useBalance({
    address: address,
    token: ADDRESS_BANDIT,
    watch: true,
  });

  const banditBal =
    !banditBalIsLoading && !banditBalIsError && !!banditBalData?.value
      ? banditBalData?.value
      : parseEther('0');

  const [outlawIdsToAdd, setOutlawsIdsToAdd] = useState([]);
  const [outlawIdsToRemove, setOutlawsIdsToRemove] = useState([]);

  const [isMaxOutlawsErrorOpen, setIsMaxOutlawsErrorOpen] = useState(false);

  const toggleOutlawSelectedToAdd = useCallback(
    (nftId) => {
      setOutlawsIdsToAdd((prevOutlawIds) => {
        if (!prevOutlawIds.includes(nftId)) {
          if (prevOutlawIds.length < 5) {
            return [...prevOutlawIds, nftId];
          } else {
            setIsMaxOutlawsErrorOpen(true);
            return [...prevOutlawIds];
          }
        } else {
          return prevOutlawIds.filter((val) => val != nftId);
        }
      });
    },
    [setOutlawsIdsToAdd]
  );

  const toggleOutlawSelectedToRemove = useCallback(
    (nftId) => {
      setOutlawsIdsToRemove((prevOutlawIds) => {
        if (!prevOutlawIds.includes(nftId)) {
          if (prevOutlawIds.length < 5) {
            return [...prevOutlawIds, nftId];
          } else {
            setIsMaxOutlawsErrorOpen(true);
            return [...prevOutlawIds];
          }
        } else {
          return prevOutlawIds.filter((val) => val != nftId);
        }
      });
    },
    [setOutlawsIdsToRemove]
  );

  const deselectOutlawsAll = useCallback(() => {
    setOutlawsIdsToAdd([]);
    setOutlawsIdsToRemove([]);
  });

  return (
    <>
      <DialogError
        open={isMaxOutlawsErrorOpen}
        setOpen={setIsMaxOutlawsErrorOpen}
        title="5 MAX"
      >
        <Typography sx={{ fontSize: '1.5em' }}>
          Yer Gang got too many Outlaws, Pardner!
        </Typography>
      </DialogError>
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
        <LocationTitle>TOWN SQUARE</LocationTitle>
        <LocationContentArea
          backgroundImage="./images/BACKGROUND.png"
          sx={{
            paddingTop: { xs: '3em', sm: '3.75em', md: '0em' },
          }}
        >
          <Box
            css={{
              position: 'relative',
              backgroundSize: '100%',
              marginTop: '1em',
              padding: '0.5em',
            }}
          >
            <OutlawPicker
              gangId={activeGangId?.toString()}
              toggleOutlawSelectedToAdd={toggleOutlawSelectedToAdd}
              outlawIdsToAdd={outlawIdsToAdd}
              toggleOutlawSelectedToRemove={toggleOutlawSelectedToRemove}
              outlawIdsToRemove={outlawIdsToRemove}
              deselectOutlawsAll={deselectOutlawsAll}
            />
            <GangBarRemovable
              banditBal={banditBal}
              gangId={activeGangId?.toString()}
              outlawIdsToRemove={outlawIdsToRemove}
              toggleOutlawSelectedToRemove={toggleOutlawSelectedToRemove}
            />
            <Box
              sx={{
                display: 'inline-block',
                backgroundImage: "url('./images/PAPER1.png')",
                backgroundSize: '100% 100%',
                width: '12.5em',
                textAlign: 'center',
                color: 'black',
                padding: '1em',
              }}
            >
              <Typography sx={{ fontSize: '2em' }}>MAP</Typography>
              <Typography
                sx={{ fontSize: '1.2em', textTransform: 'uppercase' }}
              >
                📍 Town Square
              </Typography>
              <MoveButton
                sx={{ marginBottom: '0.4em' }}
                destinationAddress={LOCATION_SILVER_STORE}
                destinationName="Silver Store"
                gangId={activeGangId?.toString()}
                destinationAbout="At the Silver Store, you can equip and uneqip Silver Dollar NFTs from numis.cz.cash to your Gang. Each Silver Dollar NFT gives your Gang an additive 10% power boost, meaning your Gang will be 10% stronger for each Silver Dollar NFT it holds in both PvP and PvE."
                isLocked={!activeGangId}
              >
                Silver Store
              </MoveButton>
              <MoveButton isLocked={true}>Red Canyons</MoveButton>
            </Box>
          </Box>
        </LocationContentArea>
        <StatsArea {...{ accountGangIdArray, deselectOutlawsAll }} />
        <TgCommentBox
          dataTelegramDiscussion="banditlsdt/3988"
          sx={{
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em',
          }}
        />
      </Box>
      <FooterArea sx={{ zIndex: 4, position: 'relative' }} />
    </>
  );
}
