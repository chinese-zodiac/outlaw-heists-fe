import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

export default function StatsAccordion({ title, children }) {
  const theme = useTheme();
  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      sx={{
        backgroundColor: 'transparent',
        color: '#701C1C',
        borderBottom: 'solid 1px #701C1C',
        boxShadow: 'none',
        '&:first-of-type': {
          borderRadius: 0,
          borderTop: 'solid 1px #701C1C',
        },
        '&:last-of-type': {
          borderRadius: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<Box sx={{ color: '#701C1C' }}>▲</Box>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ boxShadow: 'none' }}>{children}</AccordionDetails>
    </Accordion>
  );
}
