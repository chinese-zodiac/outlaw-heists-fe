import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import LocSilverStoreAbi from '../../abi/LocSilverStore.json';
import { LOCATION_SILVER_STORE } from '../../constants/locations';
import useGangName from '../../hooks/useGangName';
import useGangOwnedSilverDollarIds from '../../hooks/useGangOwnedSilverDollarIds';
import DialogTransaction from '../styled/DialogTransaction';
import SilverDollarImage from './SilverDollarImage';

export default function DialogConfirmSilverDollarsAssignment({
  ustsdIdsToAdd,
  ustsdIdsToRemove,
  deselectUstsdAll,
  gangId,
}) {
  const { gangOwnedUstsdIds } = useGangOwnedSilverDollarIds(gangId);
  const name = useGangName(gangId);
  /*const { metadataMulti } = useSilverDollarMetadataMulti([
    ...ustsdIdsToAdd,
    ...ustsdIdsToRemove,
    ...gangOwnedUstsdIds,
  ]);*/
  const newUstsdIds = [
    ...gangOwnedUstsdIds.filter((id) => ustsdIdsToRemove.indexOf(id) === -1),
    ...ustsdIdsToAdd,
  ];
  return (
    <>
      <DialogTransaction
        address={LOCATION_SILVER_STORE}
        abi={LocSilverStoreAbi}
        functionName={'depositAndWithdrawUstsd'}
        args={[gangId, ustsdIdsToAdd, ustsdIdsToRemove]}
        title="SILVER DOLLAR ASSIGNMENTS"
        onSuccess={deselectUstsdAll}
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
          {name}
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
          NEW SILVER HOLDINGS
        </Typography>
        {newUstsdIds?.length > 0 ? (
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
            {newUstsdIds.map((nftId) => (
              <Grid2 key={nftId} xs={2}>
                <SilverDollarImage nftId={nftId} />
              </Grid2>
            ))}
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
          USTSD BOOST
        </Typography>
        <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
          {((gangOwnedUstsdIds?.length ?? 0) * 1000) / 100}% ➙{' '}
          {((newUstsdIds?.length ?? 0) * 1000) / 100}%
        </Typography>
      </DialogTransaction>
    </>
  );
}
