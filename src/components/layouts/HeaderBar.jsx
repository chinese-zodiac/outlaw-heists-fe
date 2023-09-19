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
          backgroundImage: "url('./images/OUTLAWS_ON_RIDGE.png')",
          backgroundSize: 'cover',
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
            <Box sx={{ marginRight: '1em' }}>
              <Typography as="h1">
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FF7900',
                    WebkitTextStroke: '2px black',
                  }}
                >
                  BANDIT{' '}
                </Typography>
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FFF300',
                    WebkitTextStroke: '2px black',
                  }}
                >
                  HEIST
                </Typography>
              </Typography>
            </Box>
            <ConnectWallet />
            <br />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default HeaderBar;
