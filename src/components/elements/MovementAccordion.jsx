import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function MovementAccordion({ sx }) {
  return (
    <Box sx={sx}>
      <Button
        variant="text"
        sx={{
          marginTop: '0.5em',
          color: '#701C1C',
          backgroundImage: "url('./images/SIGN NO POLE.png')",
          backgroundSize: '100% 100%',
          width: '12.5em',
          maxWidth: '100%',
          lineHeight: '0.5em',
          minHeight: 0,
          padding: 0,
          fontSize: '0.75em',
        }}
      >
        NO GANGS TO MOVE{' '}
        <Typography
          as="span"
          sx={{ position: 'relative', top: '-0.1em', left: '0.2em' }}
        >
          ◀
        </Typography>
      </Button>
    </Box>
  );
}
