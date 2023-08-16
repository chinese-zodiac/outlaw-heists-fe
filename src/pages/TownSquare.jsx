import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { parseEther } from 'ethers/lib/utils.js';
import { useCallback, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import GangBarRemovable from '../components/elements/GangBarRemovable';
import LocationTitle from '../components/elements/LocationTitle';
import MovementAccordion from '../components/elements/MovementAccordion';
import OutlawPicker from '../components/elements/OutlawPicker';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import DialogError from '../components/styled/DialogError';
import StatsAccordion from '../components/styled/StatsAccordion';
import {
  ADDRESS_BANDIT,
  ADDRESS_GANGS,
  ADDRESS_OUTLAWS_NFT,
} from '../constants/addresses';
import useAccountNfts from '../hooks/useAccountNfts';
import useStore from '../store/useStore';

const banditContract = {
  address: ADDRESS_BANDIT,
  abi: IERC20Abi,
};

export default function TownSquare() {
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
    !banditBalIsLoading && !banditBalIsError
      ? banditBalData?.value
      : parseEther('0');

  const [outlawIdsToAdd, setOutlawsIdsToAdd] = useState([]);
  const [outlawIdsToRemove, setOutlawsIdsToRemove] = useState([]);
  const loadoutSelectedGangIndex = useStore(
    (state) => state.loadoutSelectedGangIndex
  );

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

  const { accountNftIdArray: accountOutlawIdArray } =
    useAccountNfts(ADDRESS_OUTLAWS_NFT);
  const { accountNftIdArray: accountGangIdArray } =
    useAccountNfts(ADDRESS_GANGS);

  const gangId = accountGangIdArray[loadoutSelectedGangIndex];

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
          backgroundImage: "url('./images/TEXTURE 1.png')",
          backgroundSize: 'contain',
          paddingBottom: '50px',
        }}
      >
        <LocationTitle>TOWN SQUARE</LocationTitle>
        <LocationContentArea>
          <MovementAccordion
            sx={{
              textAlign: 'right',
              paddingRight: '1em',
              paddingBottom: { xs: '0em' },
            }}
          />
          <Box
            css={{
              position: 'relative',
              backgroundColor: theme.palette.primary.dark,
              backgroundImage: "url('./images/plank 1 1.png')",
              backgroundSize: '100%',
              marginTop: '1em',
              padding: '0.5em',
            }}
          >
            <OutlawPicker
              gangId={gangId?.toString()}
              toggleOutlawSelectedToAdd={toggleOutlawSelectedToAdd}
              outlawIdsToAdd={outlawIdsToAdd}
              toggleOutlawSelectedToRemove={toggleOutlawSelectedToRemove}
              outlawIdsToRemove={outlawIdsToRemove}
            />
            <GangBarRemovable
              banditBal={banditBal}
              gangId={gangId?.toString()}
              outlawIdsToRemove={outlawIdsToRemove}
              toggleOutlawSelectedToRemove={toggleOutlawSelectedToRemove}
            />
          </Box>
        </LocationContentArea>
        <Box
          sx={{
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '1em',
          }}
        >
          <StatsAccordion title="INVENTORY">your gang's items</StatsAccordion>
          <StatsAccordion title="LOADOUT">
            pick your active gangs
          </StatsAccordion>
          <StatsAccordion title="TRANSACTION STATUS">
            the status of your most recent blockchain transactions
          </StatsAccordion>
          <StatsAccordion title="GANGS ONLINE">
            all gangs in the world
          </StatsAccordion>
        </Box>
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
