import { Button, Dialog, DialogContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import DialogConfirm from './DialogConfirm';

export default function DialogTransaction({
  btn,
  children,
  title,
  sx,
  address,
  abi,
  functionName,
  args,
}) {
  const [open, setOpen] = React.useState(false);
  const [openTxStatus, setOpenTxStatus] = React.useState(false);

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args,
  });
  const { data, error, isError, isLoading, isSuccess, write } =
    useContractWrite(config);
  const txHash = data?.hash ?? '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTxStatus = () => {
    setOpenTxStatus(false);
  };

  const handleConfirmed = () => {
    //send tx
    write();
    //open watch tx dialog
    handleClose();
    setOpenTxStatus(true);
  };

  return (
    <>
      {React.cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <DialogConfirm
        sx={sx}
        handleConfirmed={handleConfirmed}
        open={open}
        setOpen={setOpen}
      >
        <Typography
          as="h1"
          sx={{
            color: '#701C1C',
            fontSize: '2em',
            lineHeight: '1em',
            marginBottom: '0.5em',
          }}
        >
          {title}
        </Typography>
        {children}
      </DialogConfirm>
      <Dialog onClose={handleClose} open={openTxStatus} sx={sx}>
        <DialogContent
          sx={{
            padding: '1em',
            background: 'white',
            border: 'solid 4px #701C1C',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          <Typography
            as="h1"
            sx={{
              color: '#701C1C',
              fontSize: '2em',
              lineHeight: '1em',
              marginBottom: '0.5em',
            }}
          >
            {title}
          </Typography>
          {!!isLoading && 'Check your wallet and confirm the transaction...'}
          {!!isSuccess && (
            <>
              <Typography>TX INFO:</Typography>
              <Typography
                as="a"
                color="black"
                target="_blank"
                href={'https://bscscan.com/tx/' + txHash}
              >
                {txHash.slice(0, 5) + '...' + txHash.slice(-3)}
              </Typography>

              <Box
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CountdownCircleTimer
                  isPlaying
                  duration={9}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[9, 6, 3, 0]}
                  onComplete={() => ({ shouldRepeat: false })}
                >
                  {({ remainingTime }) => {
                    if (remainingTime === 0) {
                      return (
                        <>
                          TX
                          <br />
                          COMPLETE!
                        </>
                      );
                    } else {
                      return (
                        <Box>
                          TX Processing:
                          <br />
                          {remainingTime}
                          <br />
                          Seconds
                        </Box>
                      );
                    }
                  }}
                </CountdownCircleTimer>
              </Box>
            </>
          )}

          {!!isError && (
            <>
              <Typography>ERROR:</Typography>
              {error?.message}
            </>
          )}
          <br />
          <br />
          {!isSuccess && (
            <Button
              onClick={handleConfirmed}
              variant="text"
              autoFocus
              sx={{
                padding: '0.5em 0em 0.25em 0em',
                width: '6.5em',
                marginRight: '2em',
                backgroundColor: '#701C1C',
                borderRadius: '0',
                color: 'white',
                display: 'inline-block',
                '&:hover': {
                  backgroundColor: '#701C1C',
                },
              }}
            >
              <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                RETRY
              </Typography>
            </Button>
          )}
          <Button
            onClick={() => {
              handleCloseTxStatus();
            }}
            variant="text"
            autoFocus
            sx={{
              padding: '0.5em 0em 0.25em 0em',
              width: '6.5em',
              backgroundColor: '#701C1C',
              borderRadius: '0',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#701C1C',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              EXIT
            </Typography>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
