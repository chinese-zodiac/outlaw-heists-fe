import {
  Button,
  DialogContent,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { BigNumber, ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { cloneElement, useState } from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import IERC20Abi from '../../abi/IERC20.json';
import LocTownSquareAbi from '../../abi/LocTownSquare.json';
import { LOCATION_TOWN_SQUARE } from '../../constants/locations';
import useGangName from '../../hooks/useGangName';
import useGangOwnedERC20 from '../../hooks/useGangOwnedERC20';
import { bnToCompact } from '../../utils/bnToFixed';
import EtherTextField from '../elements/EtherTextField';
import DialogTransaction from './DialogTransaction';

export default function DialogEquipErc20({
  btn,
  sx,
  tokenAddress,
  tokenLogo,
  tokenSymbol,
  gangId,
}) {
  const { address, isConnecting, isDisconnected } = useAccount();

  const name = useGangName(gangId);

  const gangBal = useGangOwnedERC20(tokenAddress, gangId);
  const [open, setOpen] = useState(false);
  const [inputWad, setInputWad] = useState(parseEther('0'));

  const [isEquip, setIsEquip] = useState(true);

  const {
    data: dataAllowance,
    isError: isErrorAllowance,
    isLoading: isLoadingAllowance,
  } = useContractRead({
    address: tokenAddress,
    abi: IERC20Abi,
    functionName: 'allowance',
    watch: true,
    args: [address, LOCATION_TOWN_SQUARE],
    enabled: !!address,
  });

  const allowance =
    !isLoadingAllowance && !isErrorAllowance && !!dataAllowance
      ? dataAllowance
      : parseEther('0');

  const {
    data: tokenBalData,
    isError: tokenBalIsError,
    isLoading: tokenBalIsLoading,
  } = useBalance({
    address: address,
    token: tokenAddress,
    watch: true,
    enabled: !!address,
  });

  const tokenBal =
    !tokenBalIsLoading && !tokenBalIsError && !!tokenBalData?.value
      ? BigNumber.from(tokenBalData?.value ?? 0)
      : parseEther('0');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <DialogContent
          sx={{
            padding: '1em',
            background: 'white',
            border: 'solid 4px #701C1C',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          <Button
            onClick={() => {
              setIsEquip(true);
              setInputWad(BigNumber.from(0));
            }}
            sx={{
              padding: '0.25em 0em 0.1em 0em',
              width: '5em',
              marginBottom: '0.5em',
              backgroundColor: isEquip ? '#701C1C' : '#999',
              borderRadius: '0',
              lineHeight: '1em',
              fontSize: '1.5em',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            EQUIP
          </Button>
          <Button
            onClick={() => {
              setIsEquip(false);
              setInputWad(BigNumber.from(0));
            }}
            sx={{
              padding: '0.25em 0em 0.1em 0em',
              width: '5em',
              marginBottom: '0.5em',
              marginLeft: '0.5em',
              backgroundColor: !isEquip ? '#701C1C' : '#999',
              borderRadius: '0',
              lineHeight: '1em',
              fontSize: '1.5em',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            UNEQUIP
          </Button>
          <Typography sx={{ color: '#701C1C' }}>FOR</Typography>
          <Typography sx={{ fontSize: '1.25em', textTransform: 'uppercase' }}>
            {name}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              border: 'solid 3px #701C1C',
              borderRadius: '8px 8px 0px 0px',
              textAlign: 'right',
              paddingBottom: '0.5em',
              maxWidth: '17em',
            }}
          >
            <EtherTextField
              decimals={18}
              onChange={setInputWad}
              value={inputWad?.toString()}
              placeholder="0.0"
              autofocus
              fullWidth
              renderInput={(props) => (
                <TextField
                  variant="standard"
                  sx={{
                    padding: '0.25em',
                    width: '90%',
                    '& .MuiInputBase-input': {
                      fontSize: '1.5em',
                      color: 'black',
                      textAlign: 'right',
                      width: '80%',
                      display: 'inline-block',
                    },
                  }}
                  {...props}
                />
              )}
            />
            <Box
              as="img"
              src={tokenLogo}
              sx={{
                position: 'absolute',
                width: '2.5em',
                height: ' 2.5em',
                right: '0.3em',
                top: '0.3em',
              }}
            />
            <Typography sx={{ display: 'inline-block' }}>
              {isEquip ? 'WALLET' : 'GANG'} BALANCE:{' '}
              {bnToCompact(isEquip ? tokenBal : gangBal, 18, 5)}
            </Typography>
            <Button
              onClick={() =>
                isEquip ? setInputWad(tokenBal) : setInputWad(gangBal)
              }
              variant="text"
              sx={{
                minWidth: '0',
                width: '3em',
                fontSize: '0.8em',
                marginLeft: '0.5em',
                marginRight: '1em',
                padding: '0.25em 0em 0.1em 0em',
                lineHeight: '1em',
                color: 'white',
                backgroundColor: '#701C1C',
                position: 'relative',
                top: '-0.15em',
                display: 'inline-block',
                '&:hover': {
                  backgroundColor: '#080830',
                },
              }}
            >
              MAX
            </Button>
          </Box>
          <Box
            sx={{
              position: 'relative',
              border: 'solid 3px #701C1C',
              borderTop: '0px',
              borderRadius: '0px 0px 8px 8px',
              textAlign: 'right',
              paddingTop: '0.5em',
              paddingRight: '1em',
            }}
          >
            <Typography
              sx={{
                display: 'block',
                width: '100%',
                fontSize: '1.5em',
                textAlign: 'right',
                position: 'relative',
                right: '1.5em',
              }}
            >
              {bnToCompact(
                isEquip ? gangBal.add(inputWad) : tokenBal.add(inputWad),
                18,
                5
              )}
            </Typography>
            <Typography
              sx={{
                display: 'block',
                width: '100%',
                fontSize: '1em',
                textAlign: 'right',
              }}
            >
              NEW {!isEquip ? 'WALLET' : 'GANG'} BALANCE{' '}
            </Typography>
            <Box
              as="img"
              src={tokenLogo}
              sx={{
                position: 'absolute',
                width: '2.5em',
                height: ' 2.5em',
                right: '0.3em',
                top: '0.3em',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                color: '#701C1C',
                right: '4.5em',
                top: '-1em',
                textAlign: 'center',
                padding: '0.25em',
                lineHeight: '1em',
                backgroundColor: 'white',
                borderRadius: '2em',
                border: 'solid 2px #701C1C',
              }}
            >
              ▼
            </Box>
          </Box>
          <Slider
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => val + '%'}
            onChange={(e, newValue) => {
              setInputWad(
                (isEquip ? tokenBal : gangBal).mul(newValue).div(100)
              );
            }}
          />
          <br />
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              padding: '0.5em 0em 0.25em 0em',
              width: '6em',
              marginRight: '3em',
              backgroundColor: '#701C1C',
              borderRadius: '0',
              color: 'white',
              display: 'inline-block',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              EXIT
            </Typography>
          </Button>
          {isEquip && inputWad.gt(allowance) ? (
            <DialogTransaction
              title={'APPROVE ' + tokenSymbol}
              btn={
                <Button
                  onClick={() => {
                    handleConfirmed();
                  }}
                  variant="text"
                  sx={{
                    padding: '0.5em 0em 0.25em 0em',
                    width: '10em',
                    backgroundColor: '#701C1C',
                    borderRadius: '0',
                    color: 'white',
                    display: 'inline-block',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                    APPROVE
                  </Typography>
                </Button>
              }
              address={tokenAddress}
              abi={IERC20Abi}
              functionName="approve"
              args={[
                LOCATION_TOWN_SQUARE,
                ethers.constants.MaxUint256?.toString(),
              ]}
            >
              <Typography
                sx={{
                  fontSize: '1em',
                  lineHeight: '1em',
                  marginBottom: '0.5em',
                  color: '#701c1c',
                }}
              >
                TO
              </Typography>
              <Typography
                sx={{
                  fontSize: '2em',
                  lineHeight: '1em',
                  marginBottom: '0.75em',
                }}
              >
                EQUIP YOUR GANG
              </Typography>
              <Typography sx={{ fontSize: '1.25em', lineHeight: '1em' }}>
                Send an Approve transaction to your wallet that will allow you
                to equip (deposit) {tokenSymbol}s that are controlled by your
                Gangs. You can return to this location to unequip your{' '}
                {tokenSymbol}s at any time. For Metamask, its recommended to use
                the default approve. That way, you only have to do this once!
              </Typography>
            </DialogTransaction>
          ) : (
            <DialogTransaction
              title={(isEquip ? 'EQUIP ' : 'UNEQUIP ') + tokenSymbol}
              btn={
                <Button
                  onClick={() => {
                    handleConfirmed();
                  }}
                  variant="text"
                  sx={{
                    padding: '0.5em 0em 0.25em 0em',
                    width: '10em',
                    backgroundColor: '#701C1C',
                    borderRadius: '0',
                    color: 'white',
                    display: 'inline-block',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                    {isEquip ? 'EQUIP' : 'UNEQUIP'}
                  </Typography>
                </Button>
              }
              address={LOCATION_TOWN_SQUARE}
              abi={LocTownSquareAbi}
              functionName={isEquip ? 'depositBandits' : 'withdrawBandits'}
              args={[gangId?.toString(), inputWad?.toString()]}
            >
              <Typography
                sx={{
                  fontSize: '1em',
                  lineHeight: '1em',
                  marginBottom: '0.5em',
                  color: '#701c1c',
                }}
              >
                TO
              </Typography>
              <Typography
                sx={{
                  fontSize: '2em',
                  lineHeight: '1em',
                  marginBottom: '0.75em',
                }}
              >
                {isEquip ? 'GROW YOUR POWER' : 'WITHDRAW YOUR BANDITS'}
              </Typography>
              <Typography sx={{ fontSize: '1.25em', lineHeight: '1em' }}>
                {isEquip
                  ? 'Transfer Bandits from your wallet to your Gang.'
                  : 'Transfer Bandits from your Gang to your wallet.'}
                <br />
                <br />
                FOR: <Box>{name}</Box>
                <br />
                AMOUNT:
                <br />
                {isEquip ? '+' : '-'}
                {bnToCompact(inputWad, 18, 5)}
              </Typography>
            </DialogTransaction>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
