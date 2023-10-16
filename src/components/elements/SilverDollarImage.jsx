import { Box } from '@mui/system';
import useSilverDollarMetadata from '../../hooks/useSilverDollarMetadata';
import IpfsImg from './IpfsImg';

export default function SilverDollarImage({ nftId, sx }) {
  const { metadata } = useSilverDollarMetadata(nftId);
  return (
    <>
      {!metadata && (
        <Box sx={{ width: '100%', color: 'black', ...sx }}>
          METADATA LOADING...
          <br />
          (ID: {nftId})
        </Box>
      )}
      {!!metadata && !!metadata?.image && (
        <IpfsImg ipfsCid={metadata?.image} sx={{ width: '100%', ...sx }} />
      )}
    </>
  );
}
