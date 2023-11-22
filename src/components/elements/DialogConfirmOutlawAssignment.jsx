import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import LocTownSquareAbi from '../../abi/LocTownSquare.json';
import { LOCATION_TOWN_SQUARE } from '../../constants/locations';
import useGangName from '../../hooks/useGangName';
import useGangOwnedOutlawIds from '../../hooks/useGangOwnedOutlawIds';
import { useOutlawMetadataMulti } from '../../hooks/useOutlawMetadata';
import boostLookup from '../../utils/boostLookup';
import DialogTransaction from '../styled/DialogTransaction';
import OutlawImage from './OutlawImage';
import OutlawName from './OutlawName';

export default function DialogConfirmOutlawAssignment({
  outlawIdsToAdd,
  toggleOutlawSelectedToAdd,
  outlawIdsToRemove,
  toggleOutlawSelectedToRemove,
  deselectOutlawsAll,
  gangId,
}) {
  const { gangOwnedOutlawIds } = useGangOwnedOutlawIds(gangId);
  const name = useGangName(gangId);
  const isNewGang = !name;
  const { metadataMulti } = useOutlawMetadataMulti([
    ...outlawIdsToAdd,
    ...outlawIdsToRemove,
    ...gangOwnedOutlawIds,
  ]);
  const newOutlawIds = [
    ...gangOwnedOutlawIds.filter((id) => outlawIdsToRemove.indexOf(id) === -1),
    ...outlawIdsToAdd,
  ];
  const boostPrev = boostLookup(
    gangOwnedOutlawIds.map(
      (id) =>
        metadataMulti[id]?.attributes.find((attr) => attr?.trait_type == 'Item')
          ?.value
    )
  );
  const boost = boostLookup(
    newOutlawIds.map(
      (id) =>
        metadataMulti[id]?.attributes.find((attr) => attr?.trait_type == 'Item')
          ?.value
    )
  );

  return (
    <>
      <DialogTransaction
        address={LOCATION_TOWN_SQUARE}
        abi={LocTownSquareAbi}
        functionName={
          isNewGang ? 'spawnGangWithOutlaws' : 'depositAndWithdrawOutlaws'
        }
        args={
          isNewGang
            ? [outlawIdsToAdd?.map((id) => id?.toString())]
            : [
                gangId?.toString(),
                outlawIdsToAdd?.map((id) => id?.toString()),
                outlawIdsToRemove?.map((id) => id?.toString()),
              ]
        }
        title="GANG ASSIGNMENTS"
        onSuccess={deselectOutlawsAll}
        btn={
          <Button
            variant="text"
            sx={{
              backgroundColor: '#701c1c',
              borderRadius: '0',
              color: 'white',
              margin: 0,
              fontSize: { xs: '4.5vw', lg: '2em' },
              position: 'relative',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            CONFIRM
          </Button>
        }
      >
        <Typography
          sx={{
            fontSize: '1em',
            lineHeight: '1em',
            marginBottom: '0.5em',
            color: '#701c1c',
          }}
        >
          FOR
        </Typography>
        <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
          {isNewGang ? 'NEW GANG' : name}
        </Typography>
        <Typography
          sx={{
            fontSize: '1em',
            lineHeight: '1em',
            marginTop: '1em',
            marginBottom: '0.5em',
            color: '#701c1c',
          }}
        >
          NEW LINEUP
        </Typography>
        {newOutlawIds?.length > 0 ? (
          <Grid2
            container
            columns={10}
            spacing={1}
            sx={{
              border: 'solid 2px #701c1c',
              borderRadius: '8px',
              justifyContent: 'center',
            }}
          >
            {newOutlawIds.map((nftId) => (
              <Grid2 key={nftId} xs={2}>
                <OutlawImage nftId={nftId} />
                <Typography
                  sx={{
                    fontSize: '0.75em',
                    lineHeight: '0.9em',
                    backgroundColor: '#701c1c',
                    color: 'white',
                  }}
                >
                  <OutlawName nftId={nftId} />
                </Typography>
              </Grid2>
            ))}
            {Array(5 - newOutlawIds?.length ?? 0)
              .fill(0)
              .map((_, i) => {
                <Grid2 key={i} xs={2}>
                  <Box
                    sx={{
                      backgroundColor: '#D9D9D9',
                      width: '100%',
                      paddingTop: '100%',
                    }}
                  />
                  <Box
                    sx={{
                      backgroundColor: '#701c1c',
                      width: '100%',
                      height: '0.67em',
                      marginTop: '2px',
                    }}
                  />
                </Grid2>;
              })}
          </Grid2>
        ) : (
          <>
            NONE
            <br />
          </>
        )}
        <Typography
          sx={{
            fontSize: '1em',
            lineHeight: '1em',
            marginTop: '1em',
            marginBottom: '0.5em',
            color: '#701c1c',
          }}
        >
          BOOST
        </Typography>
        <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
          {boostPrev?.boostBp / 100}% ➙ {boost?.boostBp / 100}%
        </Typography>
        <Typography sx={{ fontSize: '1em', lineHeight: '1em' }}>
          ({boost?.boostType})
        </Typography>
      </DialogTransaction>
    </>
  );
}
