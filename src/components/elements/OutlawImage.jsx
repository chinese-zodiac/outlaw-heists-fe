import { Box } from '@mui/system';
import useOutlawMetadata from '../../hooks/useOutlawMetadata';
import { getIpfsUrl } from '../../utils/getIpfsJson';

export default function OutlawImage({ nftId, sx }) {
  const { metadata } = useOutlawMetadata(nftId);
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
