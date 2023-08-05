import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import ConnectWallet from '../elements/ConnectWallet';

function HeaderBar({}) {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            'linear-gradient(180deg, rgba(0,107,213,1) 10%, rgba(0,211,192,1) 90%)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box as="a" sx={{ paddingRight: 1 }} href="./">
              <Box
                as="img"
                src="./logo.png"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  maxWidth: 80,
                  transition: '.25s ease-in-out',
                  '&:hover': { transform: 'rotate(-4deg)' },
                }}
              />
            </Box>
            <Box>
              <Typography as="h1">
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FF7900',
                    WebkitTextStroke: '1px #7F2100',
                  }}
                >
                  BANDIT{' '}
                </Typography>
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FFF300',
                    WebkitTextStroke: '1px #7F2100',
                  }}
                >
                  HEIST
                </Typography>
              </Typography>
            </Box>
            <ConnectWallet />
          </Toolbar>
        </Container>
        <Box sx={{ height: 32, position: 'relative', overflow: 'none' }}>
          <Box
            as="img"
            src="./images/Vector 1.png"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
            }}
          />
          <Box
            as="img"
            src="./images/BUILDING 2-1.png"
            sx={{
              position: 'absolute',
              left: 5,
              bottom: 3,
              width: '20vw',
              maxWidth: 100,
            }}
          />
          <Box
            as="img"
            src="./images/CACTUS 1.png"
            sx={{
              position: 'absolute',
              left: '22vw',
              bottom: '2vw',
              width: '7vw',
              maxWidth: 30,
            }}
          />
          <Box
            as="img"
            src="./images/horse-set.png"
            sx={{
              position: 'absolute',
              right: '5vw',
              bottom: '1.5vw',
              width: 100,
            }}
          />
        </Box>
      </AppBar>
    </>
  );
}
export default HeaderBar;
