import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { ADDRESS_BANDIT, ADDRESS_GANGS } from '../../constants/addresses';
import { LOCATION_RESOURCES } from '../../constants/locationResources';
import useGangLocation from '../../hooks/useGangLocation';
import useGangName from '../../hooks/useGangName';
import useGangOwnedERC20, {
  useGangOwnedMultiERC20,
} from '../../hooks/useGangOwnedERC20';
import useGangOwnedOutlawIds from '../../hooks/useGangOwnedOutlawIds';
import useGangOwnedSilverDollarIds from '../../hooks/useGangOwnedSilverDollarIds';
import { useOutlawMetadataMulti } from '../../hooks/useOutlawMetadata';
import { bnToCompact } from '../../utils/bnToFixed';
import boostLookup from '../../utils/boostLookup';
import DialogInfo from '../styled/DialogInfo';
import OutlawImage from './OutlawImage';
import OutlawInfoDialog from './OutlawInfoDialog';
import OutlawName from './OutlawName';
import SilverDollarBar from './SilverDollarBar';

export default function GangInfoDialog({ gangId, btn, sx }) {
  const bandits = useGangOwnedERC20(ADDRESS_BANDIT, gangId);
  const location = useGangLocation(gangId);
  const erc20Bals = useGangOwnedMultiERC20(
    Object.values(LOCATION_RESOURCES).map(
      (resourceMetadata) => resourceMetadata.address
    ),
    gangId
  );
  const name = useGangName(gangId);
  const { gangOwnedOutlawIds } = useGangOwnedOutlawIds(gangId);
  const { gangOwnedUstsdCount } = useGangOwnedSilverDollarIds(gangId);
  const { metadataMulti } = useOutlawMetadataMulti(gangOwnedOutlawIds);

  const outlawSetBoost = boostLookup(
    gangOwnedOutlawIds?.map(
      (id) =>
        metadataMulti[id]?.attributes.find((attr) => attr?.trait_type == 'Item')
          ?.value
    )
  );

  return (
    <DialogInfo btn={btn} sx={sx}>
      <Typography
        sx={{
          color: '#6E1C1C',
          fontSize: { xs: '1.75em', md: '2em' },
          textTransform: 'uppercase',
          lineHeight: '1em',
        }}
        as="h3"
      >
        {name}
      </Typography>
      <Typography sx={{ color: 'black', lineHeight: '1em', margin: '0' }}>
        at
      </Typography>
      <Typography
        sx={{
          color: 'black',
          fontSize: { xs: '1.25em', md: '1.25em' },
          textTransform: 'uppercase',
          lineHeight: '1em',
        }}
        as="h3"
      >
        {location?.name}
      </Typography>
      <Typography
        as="a"
        href={`https://bscscan.com/nft/${ADDRESS_GANGS}/${gangId?.toString()}`}
        target="_blank"
        sx={{
          textDecoration: 'underline',
          color: 'black',
          cursor: 'pointer',
          marginLeft: '1em',
          whiteSpace: 'nowrap',
          fontSize: '1em',
        }}
      >
        GangID: {gangId?.toString()}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={{ xs: 1, md: 2 }}>
        {gangOwnedOutlawIds?.map((outlawId) => (
          <Box
            key={outlawId?.toString()}
            sx={{ width: '15%', position: 'relative' }}
          >
            <OutlawImage nftId={metadataMulti[outlawId]?.nftId} />
            <Typography
              sx={{
                fontSize: { xs: '0.5em', md: '0.75em' },
                lineHeight: '1.25em',
                paddingTop: '0.1em',
                margin: 0,
                textAlign: 'center',
                textTransform: 'uppercase',
                backgroundColor: '#701c1c',
                color: 'white',
              }}
            >
              <OutlawName nftId={outlawId} />
            </Typography>
            <OutlawInfoDialog
              nftId={outlawId}
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
        ))}
      </Stack>
      <Typography
        sx={{
          color: 'black',
          lineHeight: '1em',
          margin: '0',
          marginTop: '1em',
        }}
      >
        SILVER DOLLARS
      </Typography>
      <Typography
        sx={{
          color: 'black',
          lineHeight: '1em',
          margin: '0',
          marginTop: '1em',
        }}
      >
        Total USTSD: {gangOwnedUstsdCount?.toString()}
      </Typography>
      <SilverDollarBar gangId={gangId} />
      <Typography
        sx={{
          color: 'black',
          lineHeight: '1em',
          margin: '0',
          marginTop: '1em',
        }}
      >
        RESOURCES
      </Typography>
      <Box>
        {Object.values(LOCATION_RESOURCES).map((resourceMetadata) => (
          <React.Fragment key={resourceMetadata.address}>
            <Box
              sx={{
                whiteSpace: 'nowrap',
                display: 'inline-block',
                margin: '0em 0.25em',
              }}
            >
              <Box
                as="img"
                src={resourceMetadata.logoURI}
                sx={{
                  height: '1.5em',
                  lineHeight: '1.5em',
                  border: 'solid 1px #701C1C',
                  borderRadius: '1.5em',
                  backgroundColor: '#701C1C',
                  position: 'relative',
                  top: '0.15em',
                  marginLeft: '0.15em',
                  marginRight: '0.15em',
                }}
              />
              <Typography as="span" sx={{ fontSize: '1.5em', color: 'black' }}>
                {bnToCompact(erc20Bals?.[resourceMetadata.address], 18, 4)}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </DialogInfo>
  );
}
