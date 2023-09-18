import { Box } from '@mui/system';
import useSilverDollarMetadata from '../../hooks/useSilverDollarMetadata';
import { getIpfsUrl } from '../../utils/getIpfsJson';

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
        <Box
          as="img"
          src={getIpfsUrl(metadata.image)}
          sx={{ width: '100%', ...sx }}
        />
      )}
    </>
  );
}
