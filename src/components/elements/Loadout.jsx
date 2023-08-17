import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import LocTownSquareAbi from '../../abi/LocTownSquare.json';
import { ADDRESS_TOWN_SQUARE } from '../../constants/addresses';
import { useGangNameMulti } from '../../hooks/useGangName';
import { useGangOwnedOutlawIdsMulti } from '../../hooks/useGangOwnedOutlawIds';
import { useOutlawMetadataMulti } from '../../hooks/useOutlawMetadata';
import useStore from '../../store/useStore';
import boostLookup from '../../utils/boostLookup';
import DialogTransaction from '../styled/DialogTransaction';
import OutlawImage from './OutlawImage';

export default function Loadout({ accountGangIdArray, deselectOutlawsAll }) {
  const [loadoutSelectedGangIndex, setLoadoutSelectedGangIndex] = useStore(
    (state) => [
      state.loadoutSelectedGangIndex,
      state.setLoadoutSelectedGangIndex,
    ]
  );
  const selectedGangId =
    accountGangIdArray?.[loadoutSelectedGangIndex]?.toString();

  const names = useGangNameMulti(accountGangIdArray);
  const { gangIdToOutlawIds } = useGangOwnedOutlawIdsMulti(accountGangIdArray);
  const { metadataMulti } = useOutlawMetadataMulti(
    accountGangIdArray.map((gangId) => gangIdToOutlawIds[gangId])?.flat()
  );

  const boosts = accountGangIdArray.map((gangId) =>
    boostLookup(
      gangIdToOutlawIds[gangId]?.map(
        (id) =>
          metadataMulti[id].attributes.find(
            (attr) => attr?.trait_type == 'Item'
          )?.value
      )
    )
  );
  const handleChangeLoadout = (newGangIndex) => {
    setLoadoutSelectedGangIndex(newGangIndex);
    deselectOutlawsAll();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          border: 'solid 4px #6E1C1C',
          maxWidth: '1280px',
          borderRadius: '8px',
          padding: '1em',
        }}
      >
        {accountGangIdArray.map((gangId, i) => (
          <Box
            key={i}
            sx={{
              textAlign: 'left',
              marginBottom: '0.5em',
              padding: '8px',
              borderRadius: '8px',
              border: 'solid 4px',
              borderColor: gangId == selectedGangId ? 'blue' : 'white',
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2 }}
              sx={{
                alignItems: 'start',
              }}
            >
              <Typography
                sx={{
                  color: '#6E1C1C',
                  fontSize: { xs: '1.25em', md: '1.5em' },
                  textTransform: 'uppercase',
                  lineHeight: '1em',
                }}
                as="h3"
              >
                {names[gangId]}
              </Typography>
              {gangId != selectedGangId ? (
                <Button
                  onClick={() => handleChangeLoadout(i)}
                  sx={{
                    padding: 0,
                    marginLeft: 'auto !important',
                    color: 'white',
                    backgroundColor: '#6E1C1C',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  ⇆
                </Button>
              ) : (
                <Box
                  sx={{
                    padding: 0,
                    marginLeft: 'auto !important',
                    color: 'blue',
                  }}
                >
                  ★
                </Box>
              )}
            </Stack>
            <Typography sx={{ color: 'black', lineHeight: '1em' }}>
              TOWN SQUARE
            </Typography>
            <Typography sx={{ color: 'black', lineHeight: '1em' }}>
              0💪 0🧠 0🎯
            </Typography>
            <Typography sx={{ color: 'black', lineHeight: '1em' }}>
              BOOST: {boosts[i].boostBp / 100}% ({boosts[i].boostType})
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={{ xs: 1, md: 2 }}
            >
              {gangIdToOutlawIds[gangId].map((outlawId, j) => (
                <Box key={i + '-' + j} sx={{ width: '20%' }}>
                  <OutlawImage nftId={metadataMulti[outlawId]?.nftId} />
                </Box>
              ))}
              {[...new Array(5 - gangIdToOutlawIds[gangId].length)].map(
                (_, j) => (
                  <Box
                    key={i + '-' + j}
                    sx={{
                      width: '20%',
                      backgroundColor: '#582C2C',
                      maxWidth: '229px',
                    }}
                  />
                )
              )}
            </Stack>
          </Box>
        ))}
        <DialogTransaction
          title="SPAWN NEW GANG"
          address={ADDRESS_TOWN_SQUARE}
          abi={LocTownSquareAbi}
          functionName="spawnGang"
          btn={
            <Button
              variant="text"
              sx={{
                backgroundColor: '#701c1c',
                borderRadius: '0',
                color: 'white',
                margin: 0,
                fontSize: '1.25 em',
                marginTop: '1em',
                marginBottom: '1em',
                position: 'relative',
                '&:hover': {
                  backgroundColor: '#080830',
                },
              }}
            >
              CREATE NEW
            </Button>
          }
        >
          <Typography>
            Spawn a new, empty Gang which you can later equip Outlaws and
            Bandits from your Wallet into, after selecting it from the Loadout.
            You can also use this empty Gang to move around the Bandit Heist
            world for testing, but you won't be able to gain EXP or win battles
            unless you equip Outlaws and Bandits first.
          </Typography>
        </DialogTransaction>
      </Box>
    </>
  );
}
