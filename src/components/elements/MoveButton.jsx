import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ILocationControllerAbi from '../../abi/ILocationController.json';
import {
  ADDRESS_GANGS,
  ADDRESS_LOCATION_CONTROLLER,
} from '../../constants/addresses';
import useGangName from '../../hooks/useGangName';
import ButtonPrimary from '../styled/ButtonPrimary';
import DialogTransaction from '../styled/DialogTransaction';

export default function MoveButton({
  sx,
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
        address={ADDRESS_LOCATION_CONTROLLER}
        abi={ILocationControllerAbi}
        functionName="move"
        args={[ADDRESS_GANGS, gangId, destinationAddress]}
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
            {!isLocked ? '🛞 ' : '🔒 '}
            {children}
          </ButtonPrimary>
        }
      >
        <Typography sx={{ fontSize: '1.25em', lineHeight: '1.25em' }}>
          Move:
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
          to
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
        </Typography>
      </DialogTransaction>
    </Box>
  );
}
