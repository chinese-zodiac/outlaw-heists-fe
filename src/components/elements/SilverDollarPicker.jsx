import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import IERC721EnumerableAbi from '../../abi/IERC721Enumerable.json';
import { ADDRESS_USTSD_NFT } from '../../constants/addresses';
import { LINK_SILVER_DOLLARS_TRADING } from '../../constants/links';
import { LOCATION_SILVER_STORE } from '../../constants/locations';
import useAccountNfts from '../../hooks/useAccountNfts';
import ButtonImageLink from '../styled/ButtonImageLink';
import ConnectWallet from './ConnectWallet';
import DialogApproveSilverDollars from './DialogApproveSilverDollars';
import DialogConfirmSilverDollarsAssignment from './DialogConfirmSilverDollarsAssignment';
import SilverDollarImage from './SilverDollarImage';

const GetSilverDollars = () => (
  <ButtonImageLink
    href={LINK_SILVER_DOLLARS_TRADING}
    img="./images/ustsd-logo.png"
    sx={{
      display: 'inline-block',
    }}
    text={
      <>
        GIT YER SILVER DOLLAR NFTS ON
        <Typography variant="span" sx={{ color: '#22EE1D', display: 'block' }}>
          NUMIS.CZ.CASH
        </Typography>
      </>
    }
  />
);

export default function SilverDollarPicker({
  ustsdIdsToAdd,
  toggleUstsdSelectedToAdd,
  ustsdIdsToRemove,
  deselectUstsdAll,
  gangId,
}) {
  const theme = useTheme();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();

  const { accountNftIdArray: accountUstsdIds } =
    useAccountNfts(ADDRESS_USTSD_NFT);
  const accountUstsdCount = accountUstsdIds?.length ?? 0;

  const isCorrectChain = chain?.id == 56;
  const {
    data: dataIsApprovedForAllUstsdsOnTownSquare,
    isError: isErrorIsApprovedForAllUstsdsOnTownSquare,
    isLoading: isLoadingIsApprovedForAllUstsdsOnTownSquare,
  } = useContractRead({
    address: ADDRESS_USTSD_NFT,
    abi: IERC721EnumerableAbi,
    functionName: 'isApprovedForAll',
    watch: true,
    args: [address, LOCATION_SILVER_STORE],
    enabled: !!address,
  });
  const isApprovedForAllUstsdsOnTownSquare =
    !isLoadingIsApprovedForAllUstsdsOnTownSquare &&
    !isErrorIsApprovedForAllUstsdsOnTownSquare
      ? dataIsApprovedForAllUstsdsOnTownSquare
      : false;

  return (
    <>
      <Grid2 columns={12} container>
        <Grid2 xs={6} sx={{ overflow: 'hidden', alignSelf: 'center' }}>
          <Typography
            as="h3"
            sx={{ fontSize: { xs: '6vw', lg: '3.2em' }, color: '#6E1C1C' }}
          >
            YOUR SILVER DOLLARS
          </Typography>
          <Typography
            as="p"
            sx={{
              fontSize: {
                xs: '1.9vw',
                lg: '0.9em',
              },
              color: 'black',
              position: 'relative',
              top: { xs: '-2vw', lg: '-1em' },
            }}
          >
            {address}
          </Typography>
        </Grid2>
        <Grid2
          xs={3}
          sx={{
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          <Typography
            as="p"
            sx={{
              fontSize: { xs: '4.2vw', lg: '2.2em' },
              lineHeight: '0.9em',
              color: 'black',
            }}
          >
            EQUIP YER
          </Typography>
          <Typography
            as="p"
            sx={{
              fontSize: { xs: '6vw', lg: '3.2em' },
              lineHeight: '0.9em',
              color: 'black',
            }}
          >
            SILVER DOLLARS
          </Typography>
        </Grid2>
        <Grid2
          xs={3}
          sx={{
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          {!!isApprovedForAllUstsdsOnTownSquare ? (
            <DialogConfirmSilverDollarsAssignment
              {...{
                ustsdIdsToAdd,
                ustsdIdsToRemove,
                deselectUstsdAll,
                gangId,
              }}
            />
          ) : (
            <DialogApproveSilverDollars />
          )}
        </Grid2>
        <Grid2
          xs={12}
          sx={{
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          {!address && (
            <>
              <Box
                as="img"
                src="./images/SHOCKED COWBOY.png"
                sx={{ maxWidth: '100%', width: '120px', position: 'relative' }}
              />

              <Typography
                as="h3"
                sx={{
                  fontSize: '2.5em',
                  lineHeight: '1em',
                  marginBottom: '5em',
                  textShadow: '1px 1px 2px black',
                }}
              >
                YER WALLET <br />
                AINT CONNECTED!
                <ConnectWallet />
              </Typography>
            </>
          )}
          {!!address && !isCorrectChain && (
            <Typography
              as="h3"
              sx={{
                fontSize: '2.5em',
                lineHeight: '1em',
                marginTop: '1em',
                marginBottom: '5em',
                textShadow: '1px 1px 2px black',
              }}
            >
              WRONG CHAIN BOSS! <br />
              SWITCH TO BSC
              <Box
                as="img"
                src="./images/ROAD.png"
                sx={{ maxWidth: '100%', position: 'relative' }}
              />
            </Typography>
          )}
          {!!address && !!isCorrectChain && accountUstsdCount == 0 && (
            <Typography
              as="h3"
              sx={{
                fontSize: '2.5em',
                lineHeight: '1em',
                marginTop: '1em',
                marginBottom: '5em',
                textShadow: '1px 1px 1px black',
              }}
            >
              YER WALLET GOT <br />
              NO SILVER DOLLARS! <br />
              <GetSilverDollars />
            </Typography>
          )}
        </Grid2>
        {!!address && !!isCorrectChain && !(accountUstsdCount == 0) && (
          <>
            {accountUstsdIds.map((nftId) => {
              const isSelected = ustsdIdsToAdd?.includes(
                nftId?.toString() ?? ''
              );
              return (
                <Grid2
                  key={nftId?.toString()}
                  xs={4}
                  md={3}
                  sx={{ margin: '0em' }}
                >
                  <Box
                    sx={{
                      padding: '6px',
                      position: 'relative',
                      backgroundColor: 'transparent',
                      border: 'none',
                      paddingBottom: '1.5em',
                    }}
                  >
                    <Button
                      onClick={() => {
                        toggleUstsdSelectedToAdd(nftId?.toString());
                      }}
                      sx={{ margin: 0, padding: 0 }}
                    >
                      <SilverDollarImage
                        nftId={nftId?.toString()}
                        sx={{
                          border: 'solid blue',
                          margin: isSelected ? '-4px -4px 0px -4px' : 'none',
                          borderWidth: isSelected ? '4px 4px 0px 4px ' : '0px',
                        }}
                      />
                      <Box
                        variant="text"
                        className="equip-btn"
                        as="div"
                        sx={{
                          position: 'absolute',
                          backgroundColor: '#701c1c',
                          borderRadius: '0',
                          color: 'white',
                          left: '0px',
                          right: '0px',
                          bottom: '0em',
                          lineHeight: '1em',
                          fontSize: '1.25em',
                          padding: 0,
                          display: 'block',
                          border: 'solid blue',
                          margin: isSelected ? '0px -4px -4px -4px' : 'none',
                          borderWidth: isSelected ? '0px 4px 4px 4px ' : '0px',
                          '&:hover': {
                            backgroundColor: '#080830',
                          },
                        }}
                      >
                        {isSelected ? 'CANCEL' : 'ADD'}
                      </Box>
                    </Button>
                  </Box>
                </Grid2>
              );
            })}
            <Grid2 xs={12} fontSize="2em">
              <GetSilverDollars />
            </Grid2>
          </>
        )}
      </Grid2>
    </>
  );
}
