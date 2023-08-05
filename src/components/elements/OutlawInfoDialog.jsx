import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OUTLAW_PERSONALITIES } from '../../constants/textLoopups';
import useOutlawMetadata from '../../hooks/useOutlawMetadata';
import { getIpfsUrl } from '../../utils/getIpfsJson';
import DialogInfo from '../styled/DialogInfo';

export default function OutlawInfoDialog({ nftId, btn, sx }) {
  const { metadata } = useOutlawMetadata(nftId);
  console.log(metadata);

  return (
    <>
      <DialogInfo btn={btn} sx={sx}>
        {!metadata && (
          <Box sx={{ width: '100%', ...sx }}>
            Metadata error
            <br />
            (ID: {nftId?.toString()})
          </Box>
        )}
        {!!metadata && (
          <>
            <Box
              sx={{
                padding: '1em',
                background: 'white',
                border: 'solid 4px #701C1C',
                borderRadius: '10px',
                color: 'black',
              }}
            >
              <Box
                as="img"
                src={getIpfsUrl(metadata?.image)}
                sx={{ width: '100%', ...sx }}
              />
              <Typography
                as="h3"
                sx={{ fontSize: '2em', lineHeight: '1em', color: '#701C1C' }}
              >
                {metadata?.name}
              </Typography>
              <Typography
                as="h3"
                sx={{
                  fontSize: '1.5em',
                  color: 'black',
                  marginBottom: '0.5em',
                  lineHeight: '1em',
                }}
              >
                {!!metadata?.attributes[2]?.value &&
                  OUTLAW_PERSONALITIES[metadata.attributes[2].value]}
              </Typography>
              <Typography sx={{ lineHeight: '1em', textAlign: 'left' }}>
                {metadata?.description}
              </Typography>
            </Box>
          </>
        )}
      </DialogInfo>
    </>
  );
}
