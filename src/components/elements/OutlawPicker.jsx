import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import IERC721EnumerableAbi from '../../abi/IERC721Enumerable.json';
import LocTownSquareAbi from '../../abi/LocTownSquare.json';
import {
  ADDRESS_OUTLAWS_NFT,
  ADDRESS_TOWN_SQUARE,
} from '../../constants/addresses';
import { LINK_OUTLAWS_MINT } from '../../constants/links';
import ButtonImageLink from '../styled/ButtonImageLink';
import DialogConfirm from '../styled/DialogConfirm';
import DialogTransaction from '../styled/DialogTransaction';
import ConnectWallet from './ConnectWallet';
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
  accountNftIds,
  accountNftCount,
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
  });
  const isApprovedForAllOutlawsOnTownSquare =
    !isLoadingIsApprovedForAllOutlawsOnTownSquare &&
    !isErrorIsApprovedForAllOutlawsOnTownSquare
      ? dataIsApprovedForAllOutlawsOnTownSquare
      : false;

  console.log(dataIsApprovedForAllOutlawsOnTownSquare);

  const { config: configSpawnGangWithOutlaws } = usePrepareContractWrite({
    address: ADDRESS_TOWN_SQUARE,
    abi: LocTownSquareAbi,
    functionName: 'spawnGangWithOutlaws',
    args: [outlawIdsToAdd],
    /*overrides: {
      gasLimit: 200000,
    },*/
  });
  const {
    data: dataSpawnGangWithOutlaws,
    error: errorSpawnGangWithOutlaws,
    isLoading: isLoadingSpawnGangWithOutlaws,
    isSuccess: isSuccessSpawnGangWithOutlaws,
    write: writeSpawnGangWithOutlaws,
  } = useContractWrite(configSpawnGangWithOutlaws);
  /*
  const { config: configDepositAndWithdrawOutlaws } = usePrepareContractWrite({
    address: ADDRESS_TOWN_SQUARE,
    abi: LocTownSquareAbi,
    functionName: 'depositAndWithdrawOutlaws',
    args: [0, [], []],
  });
  const {
    data: dataDepositAndWithdrawOutlaws,
    isLoading: isLoadingDepositAndWithdrawOutlaws,
    isSuccess: isSuccessDepositAndWithdrawOutlaws,
    write: writeDepositAndWithdrawOutlaws,
  } = useContractWrite(configDepositAndWithdrawOutlaws);*/

  const [isConfirmOutlawChangeOpen, setIsConfirmOutlawChangeOpen] =
    useState(false);
  const handleConfirmOutlawChange = () => {
    console.log('Confirmed');

    //for new gang
    console.log(outlawIdsToAdd);
    writeSpawnGangWithOutlaws();
  };

  return (
    <>
      <DialogConfirm
        handleConfirmed={handleConfirmOutlawChange}
        open={isConfirmOutlawChangeOpen}
        setOpen={setIsConfirmOutlawChangeOpen}
      >
        <Typography as="h2" sx={{ fontSize: '2em' }}>
          Gang Assignments
        </Typography>
        <Typography as="h3" sx={{ fontSize: '1.5em' }}>
          FOR:
        </Typography>
        New Gang!
        <br />
        <Typography as="h3" sx={{ fontSize: '1.5em', marginTop: '0.5em' }}>
          New Lineup:
        </Typography>
        {outlawIdsToAdd?.length > 0 ? (
          <Grid2 container columns={10} spacing={1}>
            {outlawIdsToAdd.map((nftId) => (
              <Grid2 key={nftId} xs={2}>
                <OutlawImage nftId={nftId} />
                <Typography sx={{ fontSize: '0.75em', lineHeight: '0.9em' }}>
                  <OutlawName nftId={nftId} />
                </Typography>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <>
            NONE
            <br />
          </>
        )}
        <Typography as="h3" sx={{ fontSize: '1.5em', marginTop: '0.5em' }}>
          OUTLAWS BOOST:
        </Typography>
        0% ➙ 0%
        <br />
        (3 of a kind)
        <br />
      </DialogConfirm>
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
            <Button
              variant="text"
              onClick={() => setIsConfirmOutlawChangeOpen(true)}
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
          ) : (
            <DialogTransaction
              address={ADDRESS_OUTLAWS_NFT}
              abi={IERC721EnumerableAbi}
              functionName="setApprovalForAll"
              args={[ADDRESS_TOWN_SQUARE, true]}
              title="APPROVE OUTLAWS"
              btn={
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
                  APPROVE
                </Button>
              }
            >
              <Typography sx={{ fontSize: '1.25em', lineHeight: '1.25em' }}>
                Approves the Town Square's Smart Contracts to transfer Outlaws
                from your wallet to your Gang. Select YES to send the approve
                transaction to your wallet.
              </Typography>
            </DialogTransaction>
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
            {accountNftIds.map((nftId) => {
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
                      <Button
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
                        {isSelected ? 'REMOVE' : 'ADD'}
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
                      </Button>
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
