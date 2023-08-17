import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { ADDRESS_BANDIT } from '../../constants/addresses';
import useGangName from '../../hooks/useGangName';
import useGangOwnedOutlawIds from '../../hooks/useGangOwnedOutlawIds';
import { bnToCompact } from '../../utils/bnToFixed';
import { czCashBuyLink } from '../../utils/czcashLink';
import ButtonImageLink from '../styled/ButtonImageLink';
import ButtonPrimary from '../styled/ButtonPrimary';
import OutlawImage from './OutlawImage';
import OutlawInfoDialog from './OutlawInfoDialog';
import OutlawName from './OutlawName';

const EmptySlot = () => (
  <>
    <Box
      sx={{
        backgroundColor: '#582C2C',
        opacity: '83%',
        height: { xs: '17vw', sm: '15vw' },
        maxHeight: '150px',
        width: { xs: '17vw', sm: '15vw' },
        maxWidth: '150px',
      }}
    />
  </>
);

const OutlawRemovable = (nftId, isSelected, toggleOutlawSelectedToRemove) => (
  <Box
    key={nftId}
    sx={{
      backgroundColor: '#582C2C',
      height: { xs: '17vw', sm: '15vw' },
      maxHeight: '150px',
      width: { xs: '17vw', sm: '15vw' },
      maxWidth: '150px',
      position: 'relative',
    }}
  >
    <Button
      onClick={() => {
        toggleOutlawSelectedToRemove(nftId?.toString());
      }}
      sx={{ margin: 0, padding: 0 }}
    >
      <OutlawImage
        nftId={nftId?.toString()}
        sx={{
          border: 'solid red',
          margin: isSelected ? '-4px -4px 0px -4px' : 'none',
          borderWidth: isSelected ? '4px 4px 0px 4px ' : '0px',
        }}
      />
      <Box
        variant="text"
        className="equip-btn"
        as="div"
        sx={{
          position: 'absolute',
          backgroundColor: '#701c1c',
          borderRadius: '0',
          color: 'white',
          left: '0px',
          right: '0px',
          bottom: '0em',
          lineHeight: '1em',
          fontSize: '0.95em',
          padding: 0,
          display: 'block',
          border: 'solid red',
          margin: isSelected ? '0px -4px -4px -4px' : 'none',
          borderWidth: isSelected ? '0px 4px 4px 4px ' : '0px',
          '&:hover': {
            backgroundColor: '#080830',
          },
        }}
      >
        {isSelected ? 'CANCEL' : 'REMOVE'}
        <Typography
          as="span"
          sx={{
            fontSize: '0.5em',
            lineHeight: '0.75em',
            margin: 0,
            display: 'block',
          }}
        >
          <OutlawName nftId={nftId} />
        </Typography>
      </Box>
    </Button>
    <OutlawInfoDialog
      nftId={nftId}
      btn={
        <Button
          variant="text"
          className="equip-btn"
          sx={{
            position: 'absolute',
            backgroundColor: '#701c1c',
            borderRadius: '0.85em',
            color: 'white',
            margin: 0,
            right: '0.25em',
            top: '0.25em',
            fontSize: { xs: '0.5em', sm: '1em' },
            minWidth: '0',
            width: '1.7em',
            height: '1.7em',
            padding: 0,
            display: 'block',
            fontFamily: 'serif',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#080830',
            },
          }}
        >
          i
        </Button>
      }
    />
  </Box>
);

export default function GangBarRemovable({
  banditBal,
  gangId,
  outlawIdsToRemove,
  toggleOutlawSelectedToRemove,
}) {
  const name = useGangName(gangId ?? 0);
  const { gangOwnedOutlawIds } = useGangOwnedOutlawIds(gangId);
  return (
    <>
      <Box sx={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'left',
            marginLeft: '2em',
            textTransform: 'uppercase',
          }}
        >
          {/* TODO: ADD EDIT GANG NAME 
          <ModeEditOutline
            sx={{ fontSize: '1.25em', position: 'relative', top: '0.2em' }}
        />*/}
          {gangId == undefined ? <>NO GANG</> : <>{name}</>}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={{ xs: 1, md: 2 }}
        >
          {gangOwnedOutlawIds.map((id) =>
            OutlawRemovable(
              id,
              outlawIdsToRemove.includes(id),
              toggleOutlawSelectedToRemove
            )
          )}
          {[...new Array(5 - gangOwnedOutlawIds.length)].map((_, i) => (
            <EmptySlot key={i} />
          ))}
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
            <Typography sx={{ display: 'block', color: 'black' }}>
              WALLET: {bnToCompact(banditBal, 18, 5)} BANDITS
            </Typography>
            <Typography sx={{ display: 'block', color: '#6E1C1C' }}>
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
