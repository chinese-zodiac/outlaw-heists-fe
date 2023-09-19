import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useGangOwnedSilverDollarIds from '../../hooks/useGangOwnedSilverDollarIds';
import SilverDollarImage from './SilverDollarImage';

const UstsdRemovable = (nftId, isSelected, toggleUstsdSelectedToRemove) => (
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
        toggleUstsdSelectedToRemove(nftId?.toString());
      }}
      sx={{ margin: 0, padding: 0 }}
    >
      <SilverDollarImage
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
      </Box>
    </Button>
  </Box>
);

export default function SilverDollarBarRemovable({
  gangId,
  ustsdIdsToRemove,
  toggleUstsdSelectedToRemove,
}) {
  const { gangOwnedUstsdIds } = useGangOwnedSilverDollarIds(gangId);
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
          {gangOwnedUstsdIds.map((id) =>
            UstsdRemovable(
              id,
              ustsdIdsToRemove.includes(id),
              toggleUstsdSelectedToRemove
            )
          )}
        </Stack>
      </Box>
    </>
  );
}
