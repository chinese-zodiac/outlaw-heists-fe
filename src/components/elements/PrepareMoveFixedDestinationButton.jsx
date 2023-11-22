import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import LocTemplateResourceAbi from '../../abi/LocTemplateResource.json';
import useGangName from '../../hooks/useGangName';
import ButtonPrimary from '../styled/ButtonPrimary';
import DialogTransaction from '../styled/DialogTransaction';

export default function PrepareMoveFixedDestinationButton({
  sx,
  currentLocation,
  destinationAddress,
  destinationName,
  destinationAbout,
  gangId,
  children,
  isLocked,
}) {
  const name = useGangName(gangId ?? 0);
  return (
    <Box sx={sx}>
      <DialogTransaction
        address={currentLocation}
        abi={LocTemplateResourceAbi}
        functionName="prepareToMoveGangToFixedDestination"
        args={[gangId?.toString(), destinationAddress]}
        btn={
          <ButtonPrimary
            disabled={isLocked}
            sx={{
              backgroundColor: '#701C1C',
              borderRadius: 0,
              display: 'inline-block',
              fontSize: '1em',
              width: '11em',
              padding: '0.4em 0.25em',
              lineHeight: '1em',
              margin: 0,
              '&.Mui-disabled': {
                backgroundColor: '#555',
              },
            }}
          >
            {!isLocked ? '📦 ' : '🔒 '}
            {children}
          </ButtonPrimary>
        }
      >
        <Typography sx={{ fontSize: '1.25em', lineHeight: '1.25em' }}>
          Begin Preparations for:
          <br />
          <Typography
            as="span"
            sx={{
              fontSize: '1.5em',
              lineHeight: '1.25em',
              color: '#701C1C',
              textTransform: 'uppercase',
            }}
          >
            🧔🏽‍♂️ {name}
          </Typography>
          <br />
          to move to
          <br />
          <Typography
            as="span"
            sx={{
              fontSize: '1.5em',
              lineHeight: '1.25em',
              color: '#701C1C',
              textTransform: 'uppercase',
            }}
          >
            📍 {destinationName}
          </Typography>
          <br />
          <br />
          {destinationAbout}
          <br />
          <br />
          ABOUT PREPARING TO MOVE: While preparing to move, your Gang won't be
          able to collect resources or attack other Gangs. Other Gangs will
          still be able to attack your Gang. Preparing to move will take your
          Gang 4 hours, after which your Gang will be ready to move to your
          selected destination.
          <br />
          <br />
        </Typography>
      </DialogTransaction>
    </Box>
  );
}
