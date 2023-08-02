import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Billboard({ title, subtitle, children, sx }) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'transparent',
          backgroundImage: "url('./images/BILLBOARD 1.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          padding: '5px',
          paddingBottom: { xs: '9vw', md: '85px' },
          maxWidth: '400px',
          marginLeft: 'auto',
          ...sx,
        }}
      >
        <Typography
          sx={{
            margin: '0',
            position: 'relative',
            top: {
              xs: '0.7vw',
              sm: '0.8vw',
              md: '12px',
            },
            fontSize: {
              xs: '3vw',
              sm: '3.5vw',
              md: '24px',
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            margin: '0',
            position: 'relative',
            minHeight: '1em',
            top: {
              xs: '-1vw',
              md: '2px',
            },
            fontSize: {
              xs: '2vw',
              md: '16px',
            },
          }}
        >
          {subtitle}
        </Typography>
        <Box
          sx={{
            height: { xs: '23vw', sm: '25vw', md: '225px' },
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            top: { xs: '1vw', md: '15px' },
            padding: '5px',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
