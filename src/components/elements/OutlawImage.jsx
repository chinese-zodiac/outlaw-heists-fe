import { Box } from '@mui/system';
import useOutlawMetadata from '../../hooks/useOutlawMetadata';
import IpfsImg from './IpfsImg';

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
        <IpfsImg ipfsCid={metadata?.image} sx={{ width: '100%', ...sx }} />
      )}
    </>
  );
}
