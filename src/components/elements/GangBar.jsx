import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { ADDRESS_BANDIT, ADDRESS_GANGS } from '../../constants/addresses';
import useGangName from '../../hooks/useGangName';
import useGangOwnedERC20 from '../../hooks/useGangOwnedERC20';
import useGangOwnedOutlawIds from '../../hooks/useGangOwnedOutlawIds';
import useGangOwnedSilverDollarIds from '../../hooks/useGangOwnedSilverDollarIds';
import { bnToCompact } from '../../utils/bnToFixed';
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

const Outlaw = (nftId) => (
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
    <OutlawImage
      nftId={nftId?.toString()}
      sx={{
        border: 'solid red',
        margin: 'none',
        borderWidth: '0px',
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
        margin: 'none',
        borderWidth: '0px',
        '&:hover': {
          backgroundColor: '#080830',
        },
      }}
    >
      <Typography
        as="span"
        sx={{
          fontSize: { xs: '0.5em', sm: '1em' },
          lineHeight: '1em',
          margin: 0,
          display: 'block',
        }}
      >
        <OutlawName nftId={nftId} />
      </Typography>
    </Box>
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

export default function GangBar({ gangId }) {
  const name = useGangName(gangId ?? 0);
  const gangBal = useGangOwnedERC20(ADDRESS_BANDIT, gangId);
  const { gangOwnedUstsdCount } = useGangOwnedSilverDollarIds(gangId);
  const { gangOwnedOutlawIds } = useGangOwnedOutlawIds(gangId);
  return (
    <>
      <Box sx={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'left',
            marginLeft: '2em',
            textTransform: 'uppercase',
            color: 'white',
            textShadow: '1px 1px 1px black',
            fontSize: '1.25em',
            lineHeight: '1em',
          }}
        >
          {gangId == undefined ? <>NO GANG</> : <>{name}</>}
          <Typography
            as="a"
            href={`https://bscscan.com/nft/${ADDRESS_GANGS}/${gangId?.toString()}`}
            target="_blank"
            sx={{
              textDecoration: 'underline',
              color: 'white',
              cursor: 'pointer',
              marginLeft: '1em',
              whiteSpace: 'nowrap',
              fontSize: '0.7em',
            }}
          >
            GangID: {gangId?.toString()}
          </Typography>
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={{ xs: 1, md: 2 }}
        >
          {gangOwnedOutlawIds.map((id) => Outlaw(id))}
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
          <Typography
            sx={{
              display: 'block',
              color: 'white',
              textShadow: '1px 1px 1px black',
            }}
          >
            <Typography
              as="span"
              sx={{
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '1.5em',
              }}
            >
              {name} HOLDINGS:
            </Typography>
            <br />
            {bnToCompact(gangBal, 18, 5)} BANDITS
            <br />
            {gangOwnedUstsdCount} USTSD
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
