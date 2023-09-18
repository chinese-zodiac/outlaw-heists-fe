import { Box, Typography } from '@mui/material';
import Loadout from '../elements/Loadout';
import StatsAccordion from '../styled/StatsAccordion';

export default function StatsArea({ accountGangIdArray, deselectOutlawsAll }) {
  return (
    <>
      <Box
        sx={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '1em',
        }}
      >
        <StatsAccordion title="INVENTORY">
          <Typography sx={{ fontSize: '1.5em', color: '#c' }}>
            UNDER CONSTRUCTION
          </Typography>
          <Typography sx={{ color: 'black' }}>
            Once the Saloon and Armory are released, you will be able to view
            your Gang's inventory of Gear and Bottles here.
          </Typography>
        </StatsAccordion>
        <StatsAccordion title="LOADOUT">
          <Loadout {...{ accountGangIdArray, deselectOutlawsAll }} />
        </StatsAccordion>
        <StatsAccordion title="GANGS ONLINE">
          <Typography sx={{ fontSize: '1.5em', color: '#6E1C1C' }}>
            UNDER CONSTRUCTION
          </Typography>
          <Typography sx={{ color: 'black' }}>
            Once the Red Canyons are released, you will be able to view all
            Gangs in the World here.
          </Typography>
        </StatsAccordion>
      </Box>
    </>
  );
}
