import { Box, useTheme } from '@mui/material';
import React from 'react';

export default function LocationContentArea({ sx, children, backgroundImage }) {
  const theme = useTheme();
  const bp = theme.breakpoints.values;
  const mq = (bp) => `@media (min-width: ${bp}px)`;
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('./images/WOODTEXTURE-SEAMLESS.png')",
          backgroundSize: '512px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'transparent',
            backgroundImage: "url('" + backgroundImage + "')",
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '5px',
            minHeight: '600px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            ...sx,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
