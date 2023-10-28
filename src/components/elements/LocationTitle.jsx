import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';

export default function LocationTitle({ children, sx }) {
  const theme = useTheme();

  return (
    <>
      <Typography
        as="h2"
        sx={{
          color: '#6E1C1C',
          fontSize: 48,
          paddingTop: 1,
          marginTop: 0,
          ...sx,
        }}
      >
        {children}
      </Typography>
    </>
  );
}
