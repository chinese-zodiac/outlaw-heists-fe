import { useTheme } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { parseEther } from 'ethers/lib/utils.js';
import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import LocTemplateResourceAbi from '../abi/LocTemplateResource.json';
import GangBar from '../components/elements/GangBar';
import GangInfoDialog from '../components/elements/GangInfoDialog';
import LocationTitle from '../components/elements/LocationTitle';
import MoveButton from '../components/elements/MoveButton';
import PrepareMoveFixedDestinationButton from '../components/elements/PrepareMoveFixedDestinationButton';
import SilverDollarBar from '../components/elements/SilverDollarBar';
import TgCommentBox from '../components/elements/TgCommentBox';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import LocationContentArea from '../components/layouts/LocationContentArea';
import StatsArea from '../components/layouts/StatsArea';
import DialogTransaction from '../components/styled/DialogTransaction';
import Map from '../components/styled/Map';
import StatsAccordion from '../components/styled/StatsAccordion';
import { ADDRESS_ZERO } from '../constants/addresses';
import { LOCATION_ABOUTS } from '../constants/locationAbouts';
import { LOCATION_BACKGROUNDS } from '../constants/locationBackgrounds';
import { LOCATION_CHATLINKS } from '../constants/locationChatlinks';
import { LOCATION_DESTINATIONS } from '../constants/locationDestinations';
import { LOCATION_NAMES } from '../constants/locationNames';
import { LOCATION_RESOURCES } from '../constants/locationResources';
import useCountdown from '../hooks/useCountdown';
import useCurrentEpoch from '../hooks/useCurrentEpoch';
import { useGangNameMulti } from '../hooks/useGangName';
import useGangOwnedERC20 from '../hooks/useGangOwnedERC20';
import useResourceLocationAttackLog from '../hooks/useResourceLocationAttackLog';
import useResourceLocationGangInfo from '../hooks/useResourceLocationGangInfo';
import useResourceLocationInfo from '../hooks/useResourceLocationInfo';
import useViewGangsPower from '../hooks/useViewGangsPower';
import { bnToCompact } from '../utils/bnToFixed';

export default function ResourceLocation({
  accountGangIdArray,
  activeGangId,
  resourceLocationAddress,
}) {
  const theme = useTheme();
  const { address, isConnecting, isDisconnected } = useAccount();
  const locationName = LOCATION_NAMES[resourceLocationAddress];

  const {
    allFixedDestinations,
    totalPull,
    currentProdDaily,
    travelTime,
    attackCooldown,
    attackCostBps,
    victoryTransferBps,
  } = useResourceLocationInfo(resourceLocationAddress);

  const attackLog = useResourceLocationAttackLog(resourceLocationAddress);

  const gangResourceBal = useGangOwnedERC20(
    LOCATION_RESOURCES[resourceLocationAddress].address,
    activeGangId
  );

  const { gangsPower } = useViewGangsPower(resourceLocationAddress);
  const names = useGangNameMulti(gangsPower.map((gangPower) => gangPower.id));

  const {
    gangProdDaily,
    gangPower,
    gangLastAttack,
    gangAttackCooldown,
    pendingResources,
    gangPull,
    gangResourcesPerDay,
    gangDestination,
    isGangPreparingToMove,
    isGangReadyToMove,
    isGangWorking,
    whenGangIsReadyToMove,
  } = useResourceLocationGangInfo(resourceLocationAddress, activeGangId);

  const { data: dataGangAttackTarget } = useContractRead({
    abi: LocTemplateResourceAbi,
    address: resourceLocationAddress,
    functionName: 'gangAttackTarget',
    args: [activeGangId],
    watch: true,
  });
  const gangAttackTarget = gangLastAttack?.eq(0)
    ? undefined
    : dataGangAttackTarget;
  const currentEpoch = useCurrentEpoch();

  const movementPreparationCountdown = useCountdown(
    whenGangIsReadyToMove,
    'Preparations complete.'
  );

  const attackCooldownCountdown = useCountdown(
    gangAttackCooldown ?? 0,
    'READY'
  );

  const attackResolveCooldown = useCountdown(
    gangLastAttack?.add(30) ?? 0,
    'READY'
  );
  return (
    <>
      <HeaderBar />
      <Box
        css={{
          position: 'relative',
          backgroundColor: theme.palette.primary.dark,
          backgroundImage: "url('./images/WOODTEXTURE-SEAMLESS.svg')",
          backgroundSize: '512px',
          paddingBottom: '50px',
          color: 'white',
        }}
      >
        <LocationTitle sx={{ marginBottom: '0em', lineHeight: '1em' }}>
          {locationName}
        </LocationTitle>
        <Typography
          sx={{
            color: 'black',
            paddingLeft: '2em',
            paddingRight: '2em',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1em',
          }}
        >
          {LOCATION_ABOUTS[resourceLocationAddress]}
        </Typography>
        <Typography
          as="a"
          href={`https://bscscan.com/address/${resourceLocationAddress}`}
          target="_blank"
          sx={{
            textDecoration: 'underline',
            color: 'black',
            cursor: 'pointer',
          }}
        >
          {resourceLocationAddress}
        </Typography>
        <LocationContentArea
          sx={{
            paddingTop: '0.75em',
          }}
          backgroundImage={LOCATION_BACKGROUNDS[resourceLocationAddress]}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={5}
            sx={{
              justifyContent: 'center',
              marginBottom: '1em',
            }}
          >
            <Box sx={{ textShadow: '1px 1px 1px black' }}>
              <Typography sx={{ fontSize: '1em', lineHeight: '1em' }}>
                <Box
                  as="img"
                  src={LOCATION_RESOURCES[resourceLocationAddress].logoURI}
                  sx={{
                    height: '2.5em',
                    lineHeight: '1em',
                    border: 'solid 2px #701C1C',
                    borderRadius: '1.5em',
                    backgroundColor: '#701C1C',
                  }}
                />
                <Typography
                  as="span"
                  sx={{
                    fontSize: '2em',
                    lineHeight: '1em',
                    margin: '0em',
                    position: 'relative',
                    top: '-0.3em',
                    marginLeft: '0.25em',
                  }}
                >
                  {LOCATION_RESOURCES[resourceLocationAddress].name}
                </Typography>
                <br />
                <Typography
                  as="a"
                  href={`https://bscscan.com/token/${LOCATION_RESOURCES[resourceLocationAddress].address}`}
                  sx={{
                    textDecoration: 'underline',
                    color: 'white',
                    cursor: 'pointer',
                    target: '_blank',
                  }}
                >
                  {LOCATION_RESOURCES[resourceLocationAddress].address}
                </Typography>
                <br />
                Your Gang's Pull:
                <br />
                <Typography as="span" sx={{ fontSize: '1.5em' }}>
                  {bnToCompact(gangPull, 18, 8)}
                </Typography>
                <Typography as="span" sx={{ marginLeft: '0.25em' }}>
                  (
                  {bnToCompact(
                    gangPull
                      ?.mul(parseEther('1'))
                      ?.div(totalPull?.gt(0) ? totalPull : parseEther('1')),
                    16,
                    5
                  )}
                  %)
                </Typography>
                <br />
                Your Gang's
                <Box
                  as="img"
                  src={LOCATION_RESOURCES[resourceLocationAddress].logoURI}
                  sx={{
                    height: '1em',
                    lineHeight: '1em',
                    border: 'solid 1px #701C1C',
                    borderRadius: '1.5em',
                    backgroundColor: '#701C1C',
                    position: 'relative',
                    top: '0.15em',
                    marginLeft: '0.15em',
                    marginRight: '0.15em',
                  }}
                />
                per day:
                <br />
                <Typography as="span" sx={{ fontSize: '1.5em' }}>
                  {bnToCompact(gangResourcesPerDay, 18, 4)}
                </Typography>
                <br />
                Your Gang's
                <Box
                  as="img"
                  src={LOCATION_RESOURCES[resourceLocationAddress].logoURI}
                  sx={{
                    height: '1em',
                    lineHeight: '1em',
                    border: 'solid 1px #701C1C',
                    borderRadius: '1.5em',
                    backgroundColor: '#701C1C',
                    position: 'relative',
                    top: '0.15em',
                    marginLeft: '0.15em',
                    marginRight: '0.15em',
                  }}
                />
                balance:
                <br />
                <Typography as="span" sx={{ fontSize: '1.5em' }}>
                  {bnToCompact(gangResourceBal, 18, 4)}
                </Typography>
                <br />
                <DialogTransaction
                  address={resourceLocationAddress}
                  abi={LocTemplateResourceAbi}
                  functionName="claimPendingResources"
                  args={[activeGangId?.toString()]}
                  title={`Claim ${LOCATION_RESOURCES[resourceLocationAddress].name}`}
                  btn={
                    <Button
                      variant="text"
                      sx={{
                        backgroundColor: '#701c1c',
                        borderRadius: '0',
                        color: 'white',
                        margin: 0,
                        fontSize: '1em',
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: '#080830',
                        },
                      }}
                    >
                      CLAIM {bnToCompact(pendingResources, 18, 4)}
                      <Box
                        as="img"
                        src={
                          LOCATION_RESOURCES[resourceLocationAddress].logoURI
                        }
                        sx={{
                          height: '1em',
                          lineHeight: '1em',
                          border: 'solid 1px #701C1C',
                          borderRadius: '1.5em',
                          backgroundColor: '#701C1C',
                          position: 'relative',
                          top: '-0.1em',
                          marginLeft: '0.15em',
                          marginRight: '0.15em',
                        }}
                      />
                    </Button>
                  }
                >
                  Claim Pending
                  <Box
                    as="img"
                    src={LOCATION_RESOURCES[resourceLocationAddress].logoURI}
                    sx={{
                      height: '1em',
                      lineHeight: '1em',
                      border: 'solid 1px #701C1C',
                      borderRadius: '1.5em',
                      backgroundColor: '#701C1C',
                      position: 'relative',
                      top: '0.15em',
                      marginLeft: '0.15em',
                      marginRight: '0.15em',
                    }}
                  />
                  . The {LOCATION_RESOURCES[resourceLocationAddress].name} will
                  be transferred to your Gang's wallet. Your Gang can swap them
                  for valuable items at a Trading Post, sell or transfer them to
                  other Gangs, and more. You can also withdraw them to your
                  personal wallet at some Trading Posts.
                  <br />
                  <br />
                </DialogTransaction>
              </Typography>
            </Box>
            <Box sx={{ textShadow: '1px 1px 1px black' }}>
              <Typography
                sx={{
                  fontSize: '1.5em',
                  lineHeight: '1em',
                  marginTop: '0.5em',
                }}
              >
                💣 COMBAT
              </Typography>
              <Typography>
                Your Gang's Power:{' '}
                <Typography
                  as="span"
                  sx={{ fontSize: '1.5em', marginTop: '0em' }}
                >
                  {bnToCompact(gangPull, 18, 8)}
                </Typography>
                <br />
                Attack: {attackCooldownCountdown}
              </Typography>
              {!!gangsPower && gangsPower.length > 0 && (
                <>
                  {gangsPower.map((gangPowerInfo) => (
                    <Box
                      key={gangPowerInfo.id.toString()}
                      sx={{
                        background: 'white',
                        margin: '0.25em',
                        textShadow: 'none',
                        color: 'black',
                        padding: '0.5em',
                        border: 'solid 2px #701C1C',
                        borderRadius: '8px',
                        lineHeight: '1.05em',
                        display: 'inline-block',
                        position: 'relative',
                      }}
                    >
                      <GangInfoDialog
                        gangId={gangPowerInfo?.id?.toString()}
                        sx={{
                          '& .MuiDialog-paper': {
                            margin: 0,
                            padding: 0,
                          },
                          '& .MuiDialogContent-root': {
                            padding: { xs: '0.5em', md: '1em' },
                          },
                        }}
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
                              top: '0.5em',
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
                      <Typography
                        as="span"
                        sx={{ fontSize: '1.25em', marginRight: '1.25em' }}
                      >
                        {names?.[gangPowerInfo.id]}
                      </Typography>
                      <br />
                      Power:{' '}
                      {gangPowerInfo.power.gt(0)
                        ? bnToCompact(gangPowerInfo.power, 18, 5)
                        : '0'}
                      <br />
                      Bandits:{' '}
                      {gangPowerInfo.power.gt(0)
                        ? bnToCompact(gangPowerInfo.bandits, 18, 5)
                        : '0'}
                      <br />
                      Difficulty:{' '}
                      {!gangPower?.gt(0) ? (
                        <>INF</>
                      ) : (
                        bnToCompact(
                          gangPowerInfo.power
                            .add(gangPower ?? 0)
                            .mul(parseEther('1'))
                            .div(gangPower ?? parseEther('1'))
                            .sub(parseEther('1')),
                          16,
                          3
                        )
                      )}
                      %
                      <br />
                      {isGangWorking &&
                        !gangAttackTarget &&
                        !gangPowerInfo?.id.eq(activeGangId ?? 0) &&
                        gangPowerInfo.power.gt(0) &&
                        gangLastAttack?.eq(0) &&
                        !gangAttackCooldown.gt(currentEpoch ?? 0) && (
                          <DialogTransaction
                            address={resourceLocationAddress}
                            abi={LocTemplateResourceAbi}
                            functionName="startAttack"
                            args={[
                              activeGangId?.toString(),
                              gangPowerInfo.id?.toString(),
                            ]}
                            title={`Attack ${names?.[gangPowerInfo.id]}`}
                            value={parseEther('0.0025')?.toString()}
                            gas={400000}
                            btn={
                              <Button
                                variant="text"
                                sx={{
                                  backgroundColor: '#701c1c',
                                  borderRadius: '0',
                                  color: 'white',
                                  margin: 0,
                                  fontSize: '1em',
                                  position: 'relative',
                                  '&:hover': {
                                    backgroundColor: '#080830',
                                  },
                                }}
                              >
                                START ATTACK
                              </Button>
                            }
                          >
                            Attack {names?.[gangPowerInfo.id]} with your active
                            Gang. Your Gang has a{' '}
                            {bnToCompact(
                              gangPower
                                ?.mul(parseEther('1'))
                                .div(
                                  gangPower?.add(gangPowerInfo.power) ??
                                    parseEther('1')
                                ),
                              16,
                              4
                            )}
                            % chance of winning. 2% of your Gang's Bandits will
                            perish in battle, but in victory 10% of the target's
                            Bandits will join your Gang. Attacks are resolved
                            trustlessly with Chainlink VRF, which costs a 0.0025
                            BNB fee.
                            <br />
                            <br />
                          </DialogTransaction>
                        )}
                      {!!gangAttackTarget &&
                        gangPowerInfo?.id.eq(gangAttackTarget) &&
                        (!!attackResolveCooldown &&
                        attackResolveCooldown == 'READY' ? (
                          <DialogTransaction
                            address={resourceLocationAddress}
                            abi={LocTemplateResourceAbi}
                            functionName="resolveAttack"
                            args={[activeGangId?.toString()]}
                            title={`Resolve Attack`}
                            btn={
                              <Button
                                variant="text"
                                sx={{
                                  backgroundColor: '#701c1c',
                                  borderRadius: '0',
                                  color: 'white',
                                  margin: 0,
                                  fontSize: '1em',
                                  position: 'relative',
                                  '&:hover': {
                                    backgroundColor: '#080830',
                                  },
                                }}
                              >
                                RESOLVE ATTACK
                              </Button>
                            }
                          >
                            Resolve Attack on {names?.[gangPowerInfo.id]} by
                            your active Gang. 2% of your Bandits appear to have
                            perished in the fighting. If your Gang won, 10% of
                            their Bandits will join your Gang. Resolve the
                            Attack to discover the result.
                            <br />
                            <br />
                            If the Resolve Attack fails, it may be the Chainlink
                            VRF is still sending the result. Wait 5 minutes and
                            try again later. If the attack still doesn't
                            resolve, ask for help on Telegram at the bottom of
                            this page.
                            <br />
                            <br />
                          </DialogTransaction>
                        ) : (
                          <>{attackResolveCooldown}</>
                        ))}
                      {gangPowerInfo?.id.eq(activeGangId ?? 0) && (
                        <>
                          <Typography
                            sx={{ height: '2.05em', marginTop: '0.4em' }}
                          >
                            (Your Active Gang)
                          </Typography>
                        </>
                      )}
                      {!isGangWorking &&
                        !gangPowerInfo?.id.eq(activeGangId ?? 0) &&
                        !gangPowerInfo?.power.eq(0) && (
                          <>
                            <Typography
                              sx={{ height: '2.05em', marginTop: '0.4em' }}
                            >
                              (Traveling...)
                            </Typography>
                          </>
                        )}
                      {gangPowerInfo?.power.eq(0) &&
                        !gangPowerInfo?.id.eq(activeGangId ?? 0) && (
                          <>
                            <Typography
                              sx={{ height: '2.05em', marginTop: '0.4em' }}
                            >
                              (No Power)
                            </Typography>
                          </>
                        )}
                      {!gangLastAttack?.eq(0) &&
                        !gangPowerInfo?.id.eq(gangAttackTarget ?? 0) &&
                        !gangPowerInfo?.id.eq(activeGangId ?? 0) &&
                        !gangPowerInfo?.power.eq(0) && (
                          <>
                            <Typography
                              sx={{ height: '2.05em', marginTop: '0.4em' }}
                            >
                              (Attack Underway)
                            </Typography>
                          </>
                        )}
                      {!!gangAttackCooldown &&
                        gangAttackCooldown.gt(0) &&
                        gangAttackCooldown.gt(currentEpoch ?? 0) &&
                        gangLastAttack?.eq(0) &&
                        !gangPowerInfo?.id.eq(activeGangId ?? 0) &&
                        !gangPowerInfo?.power.eq(0) && (
                          <>
                            <Typography
                              sx={{ height: '2.05em', marginTop: '0.4em' }}
                            >
                              (Attack Cooldown)
                            </Typography>
                          </>
                        )}
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Stack>
          <GangBar gangId={activeGangId} />
          <SilverDollarBar gangId={activeGangId} />
          <Map>
            <Typography sx={{ fontSize: '2em' }}>MAP</Typography>
            <Typography sx={{ fontSize: '1.2em', textTransform: 'uppercase' }}>
              📍 {locationName}
            </Typography>
            {isGangWorking && (
              <>
                <Typography
                  sx={{ fontSize: '1.0em', textTransform: 'uppercase' }}
                >
                  PREPARE MOVE (4 hours)
                </Typography>
                {LOCATION_DESTINATIONS[resourceLocationAddress]?.map(
                  (destination) => (
                    <PrepareMoveFixedDestinationButton
                      key={destination}
                      sx={{ marginBottom: '0.4em' }}
                      currentLocation={resourceLocationAddress}
                      destinationAddress={destination}
                      destinationName={LOCATION_NAMES[destination]}
                      gangId={activeGangId?.toString()}
                      destinationAbout={LOCATION_ABOUTS[destination]}
                    >
                      {LOCATION_NAMES[destination]}
                    </PrepareMoveFixedDestinationButton>
                  )
                )}
              </>
            )}
            {isGangPreparingToMove && !isGangReadyToMove && (
              <>
                <Typography
                  sx={{ fontSize: '0.8em', textTransform: 'uppercase' }}
                >
                  PREPARING TO MOVE...
                </Typography>
                {movementPreparationCountdown}
                <Typography
                  sx={{
                    fontSize: '0.8em',
                    textTransform: 'uppercase',
                    marginTop: '0.5em',
                  }}
                >
                  DESTINATION:
                </Typography>
                {LOCATION_NAMES[gangDestination]}
              </>
            )}
            {isGangReadyToMove && (
              <>
                <Typography
                  sx={{ fontSize: '0.8em', textTransform: 'uppercase' }}
                >
                  ✅ Movement Ready
                </Typography>
                <MoveButton
                  sx={{ marginBottom: '0.4em' }}
                  destinationAddress={gangDestination}
                  destinationName={LOCATION_NAMES[gangDestination]}
                  gangId={activeGangId?.toString()}
                  destinationAbout={LOCATION_ABOUTS[gangDestination]}
                >
                  {LOCATION_NAMES[gangDestination]}
                </MoveButton>
              </>
            )}
          </Map>
        </LocationContentArea>
        <StatsArea {...{ accountGangIdArray }} />
        <Box
          sx={{
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '1em',
          }}
        >
          <StatsAccordion
            title={LOCATION_NAMES[resourceLocationAddress] + ' COMBAT LOG'}
          >
            {!!attackLog &&
              attackLog?.map((attack) => (
                <React.Fragment
                  key={`${attack?.attackerGangId?.toString()}-${attack?.defenderGangId?.toString()}-${attack?.time?.toString()}`}
                >
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      border: 'solid 4px #6E1C1C',
                      maxWidth: '1280px',
                      borderRadius: '8px',
                      padding: '1em',
                      textAlign: 'left',
                      margin: '0.25em',
                      display: 'inline-block',
                    }}
                  >
                    Time:{' '}
                    {new Date(
                      Number(attack?.time?.toString()) * 1000
                    ).toLocaleDateString() +
                      ' ' +
                      new Date(
                        Number(attack?.time?.toString()) * 1000
                      ).toLocaleTimeString()}
                    <br />
                    AttackerId: {attack?.attackerGangId?.toString()}
                    <br />
                    DefenderId: {attack?.defenderGangId?.toString()}
                    <br />
                    Bandit Burned: {bnToCompact(attack?.cost ?? 0, 18, 4)}
                    <br />
                    Bandit Won: {bnToCompact(attack?.winnings ?? 0, 18, 4)}
                    <br />
                    <GangInfoDialog
                      gangId={attack?.attackerGangId?.toString()}
                      sx={{
                        '& .MuiDialog-paper': {
                          margin: 0,
                          padding: 0,
                        },
                        '& .MuiDialogContent-root': {
                          padding: { xs: '0.5em', md: '1em' },
                        },
                      }}
                      btn={
                        <Button
                          variant="text"
                          className="equip-btn"
                          sx={{
                            backgroundColor: '#701c1c',
                            borderRadius: '0.85em',
                            color: 'white',
                            marginTop: '0.25em',
                            minWidth: '0',
                            padding: '0em 1em',
                            display: 'block',
                            fontFamily: 'serif',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#080830',
                            },
                          }}
                        >
                          INFO: ATTACKER
                        </Button>
                      }
                    />
                    <GangInfoDialog
                      gangId={attack?.defenderGangId?.toString()}
                      sx={{
                        '& .MuiDialog-paper': {
                          margin: 0,
                          padding: 0,
                        },
                        '& .MuiDialogContent-root': {
                          padding: { xs: '0.5em', md: '1em' },
                        },
                      }}
                      btn={
                        <Button
                          variant="text"
                          className="equip-btn"
                          sx={{
                            backgroundColor: '#701c1c',
                            borderRadius: '0.85em',
                            color: 'white',
                            marginTop: '0.25em',
                            minWidth: '0',
                            padding: '0em 1em',
                            display: 'block',
                            fontFamily: 'serif',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#080830',
                            },
                          }}
                        >
                          INFO: DEFENDER
                        </Button>
                      }
                    />
                  </Box>
                </React.Fragment>
              ))}
          </StatsAccordion>
          <StatsAccordion
            title={LOCATION_NAMES[resourceLocationAddress] + ' DEBUG DATA'}
          >
            <Box
              sx={{
                backgroundColor: 'white',
                border: 'solid 4px #6E1C1C',
                maxWidth: '1280px',
                borderRadius: '8px',
                padding: '1em',
                textAlign: 'left',
              }}
            >
              <Typography>
                Location: {LOCATION_NAMES[resourceLocationAddress]}
                <br />
                Location Smart Contract:{' '}
                <Typography
                  as="a"
                  color="#701C1C"
                  target="_blank"
                  href={
                    'https://bscscan.com/address/' + resourceLocationAddress
                  }
                >
                  {resourceLocationAddress}
                </Typography>
                <br />
                Resource: {LOCATION_RESOURCES[resourceLocationAddress].name}
                <br />
                Resource Smart Contract:{' '}
                <Typography
                  as="a"
                  color="#701C1C"
                  target="_blank"
                  href={
                    'https://bscscan.com/token/' +
                    LOCATION_RESOURCES[resourceLocationAddress].address
                  }
                >
                  {LOCATION_RESOURCES[resourceLocationAddress].address}
                </Typography>
                <br />
                gangProdDaily: {bnToCompact(gangProdDaily, 18, 8)}
                <br />
                gangPower: {bnToCompact(gangPower, 18, 8)}
                <br />
                gangLastAttack:{' '}
                {gangLastAttack?.eq(0)
                  ? 'NA'
                  : new Date(
                      Number(gangLastAttack?.toString()) * 1000
                    ).toLocaleDateString() +
                    ' ' +
                    new Date(
                      Number(gangLastAttack?.toString()) * 1000
                    ).toLocaleTimeString()}
                <br />
                gangAttackCooldown:{' '}
                {gangAttackCooldown?.eq(0)
                  ? 'NA'
                  : new Date(
                      Number(gangAttackCooldown?.toString()) * 1000
                    ).toLocaleDateString() +
                    ' ' +
                    new Date(
                      Number(gangAttackCooldown?.toString()) * 1000
                    ).toLocaleTimeString()}
                <br />
                pendingResources: {bnToCompact(pendingResources, 18, 8)}
                <br />
                gangPull: {bnToCompact(gangPull, 18, 8)}
                <br />
                gangResourcesPerDay: {bnToCompact(gangResourcesPerDay, 18, 8)}
                <br />
                gangDestination:{' '}
                {!gangDestination ? 'NA' : LOCATION_NAMES[gangDestination]}
                <br />
                gangAttackTarget:{' '}
                {gangAttackTarget == ADDRESS_ZERO
                  ? 'NA'
                  : `ID: ${gangAttackTarget?.toString()} NAME: ${
                      names?.[gangAttackTarget]
                    }`}
                <br />
                gangPull: {bnToCompact(gangPull, 18, 8)}
                <br />
                isGangPreparingToMove:{' '}
                {isGangPreparingToMove ? 'TRUE' : 'FALSE'}
                <br />
                isGangReadyToMove: {isGangReadyToMove ? 'TRUE' : 'FALSE'}
                <br />
                isGangWorking: {isGangWorking ? 'TRUE' : 'FALSE'}
                <br />
                whenGangIsReadyToMove:{' '}
                {whenGangIsReadyToMove?.eq(0)
                  ? 'NA'
                  : new Date(
                      Number(whenGangIsReadyToMove?.toString()) * 1000
                    ).toLocaleDateString() +
                    ' ' +
                    new Date(
                      Number(whenGangIsReadyToMove?.toString()) * 1000
                    ).toLocaleTimeString()}
                <br />
              </Typography>
            </Box>
          </StatsAccordion>
        </Box>
        <TgCommentBox
          dataTelegramDiscussion={LOCATION_CHATLINKS[resourceLocationAddress]}
          sx={{
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em',
          }}
        />
        <FooterArea sx={{ zIndex: 4, position: 'relative' }} />
      </Box>
    </>
  );
}
