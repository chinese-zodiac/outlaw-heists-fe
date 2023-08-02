import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { parseEther } from 'ethers/lib/utils.js';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import IERC721EnumerableAbi from '../abi/IERC721Enumerable.json';
import Billboard from '../components/elements/Billboard';
import GangEditor from '../components/elements/GangEditor';
import LocationTitle from '../components/elements/LocationTitle';
import MovementAccordion from '../components/elements/MovementAccordion';
import OutlawList from '../components/elements/OutlawList';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import StatsAccordion from '../components/styled/StatsAccordion';
import { ADDRESS_BANDIT, ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
import useAccountNfts from '../hooks/useAccountNfts';

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

  const {
    data: outlawSupplyData,
    isError: outlawSupplyIsError,
    isLoading: outlawSupplyIsLoading,
  } = useContractRead({
    address: ADDRESS_OUTLAWS_NFT,
    abi: IERC721EnumerableAbi,
    functionName: 'totalSupply',
    watch: true,
  });

  const outlawSupply =
    !outlawSupplyIsLoading && !outlawSupplyIsError
      ? outlawSupplyData
      : parseEther('0');

  const outlawNftIds = useAccountNfts(ADDRESS_OUTLAWS_NFT);

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
          <Grid
            container
            spacing={2}
            sx={{ alignItems: 'start', marginTop: '0.5em' }}
          >
            <Grid xs={6}>
              <Billboard
                title="YER OUTLAWS"
                subtitle={address}
                sx={{
                  fontSize: { xs: '1.25em', sm: '2.5em' },
                }}
              >
                <OutlawList />
              </Billboard>
            </Grid>
            <Grid xs={6}>
              <MovementAccordion
                sx={{
                  textAlign: 'right',
                  paddingRight: '1em',
                  paddingBottom: { xs: '4.5em', sm: '5em', md: '10em' },
                }}
              />
              <Box sx={{ position: 'relative' }}>
                <Box
                  as="img"
                  src="./images/game.png"
                  sx={{
                    width: '100%',
                    maxWidth: '425px',
                    display: 'inline-block',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <GangEditor />
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
