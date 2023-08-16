import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import IERC721EnumerableAbi from '../../abi/IERC721Enumerable.json';
import {
  ADDRESS_OUTLAWS_NFT,
  ADDRESS_TOWN_SQUARE,
} from '../../constants/addresses';
import { LINK_OUTLAWS_MINT } from '../../constants/links';
import ButtonImageLink from '../styled/ButtonImageLink';
import ConnectWallet from './ConnectWallet';
import DialogApproveOutlaws from './DialogApproveOutlaws';
import DialogConfirmOutlawAssignment from './DialogConfirmOutlawAssignment';
import OutlawImage from './OutlawImage';
import OutlawInfoDialog from './OutlawInfoDialog';
import OutlawName from './OutlawName';

const GetOutlawsButton = () => (
  <ButtonImageLink
    href={LINK_OUTLAWS_MINT}
    img="./images/outlaws-button-icon.png"
    sx={{
      display: 'inline-block',
    }}
    text={
      <>
        GIT YER OUTLAW NFTS ON
        <Typography variant="span" sx={{ color: '#22EE1D', display: 'block' }}>
          OUTLAWS.CZ.CASH
        </Typography>
      </>
    }
  />
);

export default function OutlawPicker({
  accountOutlawIds,
  accountOutlawCount,
  outlawIdsToAdd,
  toggleOutlawSelected,
}) {
  const theme = useTheme();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();

  const isCorrectChain = chain?.id == 56;
  const {
    data: dataIsApprovedForAllOutlawsOnTownSquare,
    isError: isErrorIsApprovedForAllOutlawsOnTownSquare,
    isLoading: isLoadingIsApprovedForAllOutlawsOnTownSquare,
  } = useContractRead({
    address: ADDRESS_OUTLAWS_NFT,
    abi: IERC721EnumerableAbi,
    functionName: 'isApprovedForAll',
    watch: true,
    args: [address, ADDRESS_TOWN_SQUARE],
    enabled: !!address,
  });
  const isApprovedForAllOutlawsOnTownSquare =
    !isLoadingIsApprovedForAllOutlawsOnTownSquare &&
    !isErrorIsApprovedForAllOutlawsOnTownSquare
      ? dataIsApprovedForAllOutlawsOnTownSquare
      : false;

  return (
    <>
      <Grid2 columns={12} container>
        <Grid2 xs={6} sx={{ overflow: 'hidden', alignSelf: 'center' }}>
          <Typography
            as="h3"
            sx={{ fontSize: { xs: '6vw', lg: '3.2em' }, color: '#6E1C1C' }}
          >
            YOUR OUTLAWS
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
            CHOOSE YER
          </Typography>
          <Typography
            as="p"
            sx={{
              fontSize: { xs: '6vw', lg: '3.2em' },
              lineHeight: '0.9em',
              color: 'black',
            }}
          >
            OUTLAW
          </Typography>
        </Grid2>
        <Grid2
          xs={3}
          sx={{
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          {!!isApprovedForAllOutlawsOnTownSquare ? (
            <DialogConfirmOutlawAssignment outlawIdsToAdd={outlawIdsToAdd} />
          ) : (
            <DialogApproveOutlaws />
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
          {!!address && !!isCorrectChain && accountOutlawCount == 0 && (
            <Typography
              as="h3"
              sx={{
                fontSize: '2.5em',
                lineHeight: '1em',
                marginTop: '1em',
                marginBottom: '5em',
              }}
            >
              YA AINT GOT <br />
              NO OUTLAWS! <br />
              <GetOutlawsButton />
            </Typography>
          )}
        </Grid2>
        {!!address && !!isCorrectChain && !(accountOutlawCount == 0) && (
          <>
            {accountOutlawIds.map((nftId) => {
              const isSelected = outlawIdsToAdd?.includes(
                nftId?.toString() ?? ''
              );
              return (
                <Grid2 key={nftId} xs={4} md={3} sx={{ margin: '0em' }}>
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
                        toggleOutlawSelected(nftId?.toString());
                      }}
                      sx={{ margin: 0, padding: 0 }}
                    >
                      <OutlawImage
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
                        <Typography
                          as="span"
                          sx={{
                            fontSize: '0.5em',
                            lineHeight: '0.75em',
                            margin: 0,
                            display: 'block',
                          }}
                        >
                          <OutlawName nftId={nftId} />
                        </Typography>
                      </Box>
                    </Button>
                    <OutlawInfoDialog
                      nftId={nftId}
                      btn={
                        <Button
                          variant="text"
                          className="equip-btn"
                          sx={{
                            position: 'absolute',
                            backgroundColor: '#701c1c',
                            borderRadius: '0.85em',
                            color: 'white',
                            margin: 0,
                            right: '0.75em',
                            top: '0.75em',
                            fontSize: { xs: '1em', sm: '1.5em' },
                            minWidth: '0',
                            width: '1.7em',
                            height: '1.7em',
                            padding: 0,
                            display: 'block',
                            fontFamily: 'serif',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#080830',
                            },
                          }}
                        >
                          i
                        </Button>
                      }
                    />
                  </Box>
                </Grid2>
              );
            })}
            <Grid2 xs={12} fontSize="2em">
              <GetOutlawsButton />
            </Grid2>
          </>
        )}
      </Grid2>
    </>
  );
}
