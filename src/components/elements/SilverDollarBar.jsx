import { Box, Stack } from '@mui/system';
import useGangOwnedSilverDollarIds from '../../hooks/useGangOwnedSilverDollarIds';
import SilverDollarImage from './SilverDollarImage';

const Ustsd = (nftId) => (
  <Box
    key={nftId}
    sx={{
      backgroundColor: '#582C2C',
      height: { xs: '10vw', sm: '10vw' },
      maxHeight: '150px',
      width: { xs: '10vw', sm: '10vw' },
      maxWidth: '150px',
      position: 'relative',
      marginBottom: '0.5em',
    }}
  >
    <Box sx={{ margin: 0, padding: 0 }}>
      <SilverDollarImage
        nftId={nftId?.toString()}
        sx={{
          border: 'solid red',
          margin: 'none',
          borderWidth: '0px',
        }}
      />
    </Box>
  </Box>
);

export default function SilverDollarBar({ gangId }) {
  const { gangOwnedUstsdIds } = useGangOwnedSilverDollarIds(gangId);
  return (
    <>
      <Box sx={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ flexWrap: 'wrap' }}
          spacing={{ xs: 1, md: 2 }}
        >
          {gangOwnedUstsdIds.map((id) => Ustsd(id))}
        </Stack>
      </Box>
    </>
  );
}
