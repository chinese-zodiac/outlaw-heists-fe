import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

export default function Map(props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'inline-block',
        backgroundImage: "url('./images/MAP-BG.svg')",
        backgroundSize: '100% 100%',
        textAlign: 'center',
        color: 'black',
        paddingTop: '4em',
        marginBottom: '1em',
        minHeight: '20em',
        width: '100%',
      }}
    >
      {props?.children}
    </Box>
  );
}
