import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import LocTownSquareAbi from '../../abi/LocTownSquare.json';
import { ADDRESS_BANDIT } from '../../constants/addresses';
import { LOCATION_TOWN_SQUARE } from '../../constants/locations';
import { useGangLocationMulti } from '../../hooks/useGangLocation';
import { useGangNameMulti } from '../../hooks/useGangName';
import { useGangOwnedERC20Multi } from '../../hooks/useGangOwnedERC20';
import { useGangOwnedOutlawIdsMulti } from '../../hooks/useGangOwnedOutlawIds';
import { useGangOwnedSilverDollarIdsMulti } from '../../hooks/useGangOwnedSilverDollarIds';
import { useOutlawMetadataMulti } from '../../hooks/useOutlawMetadata';
import useStore from '../../store/useStore';
import { bnToCompact } from '../../utils/bnToFixed';
import boostLookup from '../../utils/boostLookup';
import DialogTransaction from '../styled/DialogTransaction';
import OutlawImage from './OutlawImage';
import OutlawInfoDialog from './OutlawInfoDialog';
import OutlawName from './OutlawName';

export default function Loadout({ accountGangIdArray, deselectOutlawsAll }) {
  const [loadoutSelectedGangIndex, setLoadoutSelectedGangIndex] = useStore(
    (state) => [
      state.loadoutSelectedGangIndex,
      state.setLoadoutSelectedGangIndex,
    ]
  );
  const selectedGangId =
    accountGangIdArray?.[loadoutSelectedGangIndex]?.toString();

  const locations = useGangLocationMulti(accountGangIdArray);
  const names = useGangNameMulti(accountGangIdArray);
  const gangBals = useGangOwnedERC20Multi(ADDRESS_BANDIT, accountGangIdArray);
  const { gangIdToOutlawIds } = useGangOwnedOutlawIdsMulti(accountGangIdArray);
  const { gangIdToUstsdIds } =
    useGangOwnedSilverDollarIdsMulti(accountGangIdArray);
  const { metadataMulti } = useOutlawMetadataMulti(
    accountGangIdArray.map((gangId) => gangIdToOutlawIds[gangId])?.flat()
  );

  const boosts = accountGangIdArray.map((gangId) =>
    boostLookup(
      gangIdToOutlawIds[gangId]?.map(
        (id) =>
          metadataMulti[id]?.attributes.find(
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
            <Button
              onClick={() => handleChangeLoadout(i)}
              variant="text"
              sx={{
                width: '100%',
                minWidth: '100%',
                display: 'block',
                padding: 0,
                backgroundColor: 'white',
                marginBottom: '0.25em',
                '&:hover': {
                  backgroundColor: '#e1e1f1',
                },
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
                  <Box
                    sx={{
                      padding: 0,
                      marginLeft: 'auto !important',
                      color: 'white',
                      backgroundColor: '#6E1C1C',
                      lineHeight: '1.2em',
                      borderRadius: '0.25em',
                      width: '1.5em',
                      '&:hover': {
                        backgroundColor: '#080830',
                      },
                    }}
                  >
                    ⇆
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: 0,
                      marginLeft: 'auto !important',
                      color: 'blue',
                      lineHeight: '1.2em',
                    }}
                  >
                    ★
                  </Box>
                )}
              </Stack>
            </Button>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={{ xs: 1, md: 2 }}
            >
              {gangIdToOutlawIds?.[gangId]?.map((outlawId, j) => (
                <Box
                  key={i + '-' + j}
                  sx={{ width: '20%', position: 'relative' }}
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
              {!!gangIdToOutlawIds?.[gangId]?.length &&
                [...new Array(5 - gangIdToOutlawIds[gangId].length)].map(
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
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexWrap: 'wrap',
                marginTop: '0.5em',
              }}
            >
              <Typography
                sx={{
                  color: 'black',
                  lineHeight: '1em',
                }}
              >
                {locations[gangId]?.name}
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  lineHeight: '1em',
                }}
              >
                BOOST:{' '}
                {(boosts[i].boostBp + gangIdToUstsdIds[gangId]?.length * 1000) /
                  100}
                % ({boosts[i].boostType})
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  lineHeight: '1em',
                }}
              >
                BANDITS: {bnToCompact(gangBals[gangId], 18, 5)}
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  lineHeight: '1em',
                }}
              >
                USTSD: {gangIdToUstsdIds[gangId]?.length}
              </Typography>
            </Stack>
          </Box>
        ))}
        <DialogTransaction
          title="SPAWN NEW GANG"
          address={LOCATION_TOWN_SQUARE}
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
