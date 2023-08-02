import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { LINK_OUTLAWS_MINT } from '../../constants/links';
import ButtonImageLink from '../styled/ButtonImageLink';

export default function OutlawList() {
  const theme = useTheme();

  return (
    <>
      <ButtonImageLink
        href={LINK_OUTLAWS_MINT}
        img="./images/outlaws-button-icon.png"
        text={
          <>
            GIT YER OUTLAW NFTS ON
            <Typography
              variant="span"
              sx={{ color: '#22EE1D', display: 'block' }}
            >
              OUTLAWS.CZ.CASH
            </Typography>
          </>
        }
      />
      <Typography
        as="h3"
        sx={{
          fontSize: '0.8em',
          lineHeight: '1em',
          marginTop: '0.25em',
        }}
      >
        YA AINT GOT <br />
        NO OUTLAWS!
      </Typography>
    </>
  );
}
