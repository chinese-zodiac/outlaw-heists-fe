import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
  const {
    isOpen: web3ModalIsOpen,
    open: web3ModalOpen,
    close: web3ModalClose,
  } = useWeb3Modal();
  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Box>
        <Box>
          {!!address ? (
            <>
              <Tooltip title="Open Wallet Settings">
                <Button
                  onClick={() => web3ModalOpen({ view: 'Account' })}
                  sx={{
                    textTransform: 'unset',
                    color: 'white',
                    fontSize: 28,
                    WebkitTextStroke: '1px #472f21',
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    border: 'solid 1px white',
                    borderRadius: '0.9em',
                    backgroundColor: '#701c1c',
                    width: '7em',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  <Avatar
                    alt={address}
                    src={makeBlockie(address)}
                    sx={{
                      mr: 1,
                      height: 'auto',
                      width: '0.9em',
                      border: 'solid 1px white',
                    }}
                  />
                  0x...{address.substring(38)}
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Login Your Wallet">
                <Button
                  onClick={() => web3ModalOpen({ view: 'Connect' })}
                  sx={{
                    width: '7em',
                    fontWeight: 'bold',
                    color: 'white',
                    WebkitTextStroke: '1px #472f21',
                    borderRadius: '0.9em',
                    border: 'solid 1px white',
                    fontSize: 28,
                    backgroundColor: '#701c1c',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  Connect{' '}
                  <Box
                    as="img"
                    src="./images/CONNECT.png"
                    sx={{
                      display: 'inline-block',
                      maxWidth: 28,
                      marginLeft: 1,
                      position: 'relative',
                      top: '-3px',
                    }}
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
