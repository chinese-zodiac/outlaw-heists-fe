import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import { parseEther } from 'ethers/lib/utils.js';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import IERC721EnumerableAbi from '../abi/IERC721Enumerable.json';
import GangEditor from '../components/elements/GangEditor';
import LocationTitle from '../components/elements/LocationTitle';
import MovementAccordion from '../components/elements/MovementAccordion';
import OutlawPicker from '../components/elements/OutlawPicker';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import StatsAccordion from '../components/styled/StatsAccordion';
import { ADDRESS_BANDIT, ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
import useAccountNfts from '../hooks/useAccountNfts';
import { useState } from 'react';

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
  const handleAddOutlaw = (newOutlawId) => {
    setOutlawsIdsToAdd((prevOutlawIds) => [...prevOutlawIds, newOutlawId]);
  }


  const { accountNftIdArray } = useAccountNfts(ADDRESS_OUTLAWS_NFT);

  return (
    <>
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
              accountNftIds={accountNftIdArray}
              handleAddOutlaw={handleAddOutlaw}
              outlawIdsToAdd={outlawIdsToAdd}
              accountNftCount={accountNftIdArray.length}
            />
          </Box>
          <GangEditor banditBal={banditBal} />
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
