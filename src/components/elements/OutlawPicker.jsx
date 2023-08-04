import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { useAccount, useNetwork } from 'wagmi';
import { LINK_OUTLAWS_MINT } from '../../constants/links';
import ButtonImageLink from '../styled/ButtonImageLink';
import OutlawImage from './OutlawImage';
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

export default function OutlawPicker({ accountNftIds, accountNftCount }) {
  const theme = useTheme();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();

  const isCorrectChain = chain?.id == 56;

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
          <Button
            variant="text"
            sx={{
              backgroundColor: '#701c1c',
              borderRadius: '0',
              color: 'white',
              margin: 0,
              fontSize: { xs: '4.5vw', lg: '2em' },
              position: 'relative',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            CONFIRM
          </Button>
        </Grid2>
        <Grid2
          xs={12}
          sx={{
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          {!address && (
            <Typography
              as="h3"
              sx={{
                fontSize: '2.5em',
                lineHeight: '1em',
                marginTop: '1em',
                marginBottom: '5em',
              }}
            >
              YER WALLET <br />
              AINT CONNECTED!
            </Typography>
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
            </Typography>
          )}
          {!!address && !!isCorrectChain && accountNftCount == 0 && (
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
        {!!address && !!isCorrectChain && !(accountNftCount == 0) && (
          <>
            {accountNftIds.map((nftId) => (
              <Grid2 key={nftId} xs={4} md={3}>
                <Box
                  as="button"
                  sx={{
                    padding: '0.5em',
                    position: 'relative',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    '& > img': {
                      filter: 'hue-rotate(0deg) saturate(1)',
                      transition: '500ms',
                    },
                    '&:hover > img': {
                      filter: 'hue-rotate(220deg) saturate(1.5)',
                    },
                    '&:hover > .equip-btn': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  <OutlawImage nftId={nftId} />
                  <Button
                    as="div"
                    variant="text"
                    className="equip-btn"
                    sx={{
                      position: 'absolute',
                      backgroundColor: '#701c1c',
                      borderRadius: '0',
                      color: 'white',
                      margin: 0,
                      left: '0.5em',
                      right: '0.5em',
                      bottom: '0.6em',
                      lineHeight: '1em',
                      fontSize: '1.25em',
                      padding: 0,
                      transition: '500ms',
                      '&:hover': {
                        backgroundColor: '#701c1c',
                      },
                    }}
                  >
                    SELECT
                    <br />
                    <Typography
                      sx={{
                        fontSize: '0.5em',
                        lineHeight: '0.75em',
                        margin: 0,
                      }}
                    >
                      <OutlawName nftId={nftId} />
                    </Typography>
                  </Button>
                </Box>
              </Grid2>
            ))}
            <Grid2 xs={12} fontSize="2em">
              <GetOutlawsButton />
            </Grid2>
          </>
        )}
      </Grid2>
    </>
  );
}
