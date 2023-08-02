import { Box, useTheme } from '@mui/material';
import React from 'react';

export default function LocationContentArea({ sx, children }) {
  const theme = useTheme();
  const bp = theme.breakpoints.values;
  const mq = (bp) => `@media (min-width: ${bp}px)`;
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#D89440',
          backgroundImage: "url('./images/BACKGROUND.png')",
          backgroundSize: { xs: '125vw', sm: 'contain' },
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
    </>
  );
}
