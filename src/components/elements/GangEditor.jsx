import { ModeEditOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { ADDRESS_BANDIT } from '../../constants/addresses';
import { czCashBuyLink } from '../../utils/czcashLink';
import ButtonImageLink from '../styled/ButtonImageLink';
import ButtonPrimary from '../styled/ButtonPrimary';

const EmptySlot = () => (
  <>
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: '#6E3D2F',
        height: { xs: '17vw', sm: '15vw' },
        maxHeight: '150px',
        width: { xs: '17vw', sm: '15vw' },
        maxWidth: '150px',
        fontSize: { xs: '0.5em', sm: '0.75em', md: '1em' },
      }}
    >
      <Typography sx={{ fontSize: '1em' }}>PUT YER</Typography>
      <Typography sx={{ fontSize: '5em', lineHeight: '0.5em' }}>+</Typography>
      <Typography sx={{ fontSize: '1em' }}>OUTLAW</Typography>
    </Stack>
  </>
);

export default function GangEditor() {
  return (
    <>
      <Box sx={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'left',
            marginLeft: '2em',
          }}
        >
          <ModeEditOutline
            sx={{ fontSize: '1.25em', position: 'relative', top: '0.2em' }}
          />
          NO GANG TO NAME{' '}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={{ xs: 1, md: 2 }}
        >
          <EmptySlot />
          <EmptySlot />
          <EmptySlot />
          <EmptySlot />
          <EmptySlot />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems={{ xs: 'center', sm: 'start' }}
          spacing={{ xs: 1, md: 2 }}
          sx={{ marginTop: '1em' }}
        >
          <Box>
            <ButtonPrimary
              sx={{
                backgroundColor: '#701C1C',
                borderRadius: 0,
                display: 'inline-block',
                fontSize: '1.5em',
                width: '11em',
                padding: '0.4em 0.25em',
                lineHeight: '1em',
                margin: 0,
              }}
            >
              <Box
                sx={{
                  backgroundImage: "url('./logo.png')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '1em',
                  height: '1em',
                  margin: '0',
                  marginRight: '0.25em',
                  position: 'relative',
                  top: '0.15em',
                  display: 'inline-block',
                }}
              />
              EQUIP BANDITS
            </ButtonPrimary>
            <Typography sx={{ display: 'block' }}>
              WALLET: 100.01 BANDITS
            </Typography>
            <Typography sx={{ display: 'block' }}>
              GANG: 100.00 BANDITS
            </Typography>
          </Box>
          <ButtonImageLink
            href={czCashBuyLink(ADDRESS_BANDIT)}
            img="./logo.png"
            sx={{
              fontSize: '1.5em',
              width: '11em',
              margin: 0,
            }}
            text={
              <>
                BUY BANDITS ON{' '}
                <Typography
                  variant="span"
                  sx={{
                    color: '#EF4E4E',
                    display: 'inline-block',
                  }}
                >
                  CZ.CASH
                </Typography>
              </>
            }
          />
        </Stack>
      </Box>
    </>
  );
}
