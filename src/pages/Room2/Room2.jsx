import React, {
  useRef, useEffect, memo,
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Typewriter from 'typewriter-effect';

// components
import Transmission from '../Transmisson/Transmission';
import InterestPoint from '../../components/InterestPoint/InterestPoint';

// state
import {
  unlockSafe, visitRoom, unlockRoom, changeRoom,
} from '../../state/gameSlice';

// utils
import useGotoPage from '../../hooks/useGotoPage';
import useAudio from '../../hooks/useAudio';

// assets
// import CircoCoImg from '../../assets/images/circo_co.png';
import MorseCodeImg from '../../assets/images/morse_code.png';
import CombinationLockImg from '../../assets/images/combination_lock.png';
import LockedDoor2Img from '../../assets/images/lock_room_2.png';

const Clue1Content = () => (
  <div style={{
    width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
  }}
  >
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString('ON OFF OFF ON OFF ON ON OFF ON OFF OFF OFF OFF OFF')
          .start();
      }}
    />
  </div>
);

const Room2 = ({
  playPrevAudio, playAudioNext, stopAudio, supportAudio,
}) => {
  const dispatch = useDispatch();
  const { gotoPage } = useGotoPage();
  const {
    playPaperSFX, playDoorUnlockedSFX, playDoorLockedSFX, playMetalSFX,
  } = useAudio();
  const { playMorseCode, stopMorseCode } = supportAudio;

  const lockedSafeRef = useRef();
  const lockedDoorRef = useRef();

  const isSafeUnlocked = useSelector((state) => state.root.room2SafeUnlocked);
  const isRoomUnlocked = useSelector((state) => state.root.unlockedRooms.includes('room-2'), shallowEqual);
  const isRoomVisited = useSelector((state) => state.root.visitedRooms.includes('room-2'), shallowEqual);

  useEffect(() => {
    dispatch(changeRoom('room-2'));
    if ((isSafeUnlocked && !isRoomUnlocked)) playMorseCode();
  }, []);

  useEffect(() => {
    if (isRoomUnlocked) stopMorseCode();
  }, [isRoomUnlocked]);

  const handleBacktoRoom1 = () => {
    stopAudio();
    stopMorseCode();
    playPrevAudio();
    gotoPage('/room-1');
  };

  const handleValidateSafe = () => {
    const isValid = lockedSafeRef.current.getCurrentStatus();
    if (isValid) {
      dispatch(unlockSafe('room2SafeUnlocked'));
      playDoorUnlockedSFX();
      if (!isRoomUnlocked) playMorseCode();
    } else {
      playDoorLockedSFX();
    }

    return isValid;
  };

  const handleValidateDoor = () => {
    const isValid = lockedDoorRef.current.getCurrentStatus();
    if (isValid) {
      if (!isRoomUnlocked) {
        dispatch(unlockRoom('room-2'));
      }
      playDoorUnlockedSFX();
      stopMorseCode();
      stopAudio();
      playAudioNext();
      gotoPage('/room-3');
    }

    return isValid;
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {
        !isRoomVisited && (
          <Transmission
            text="You found yourself in the basement of the house..."
            endCallback={() => {
              dispatch(visitRoom('room-2'));
            }}
          />
        )
      }
      {/* back to room 1 pin point */}
      <InterestPoint
        tooltip="To living room"
        handlePinPointClick={() => handleBacktoRoom1()}
        positionBottom="48%"
        positionRight="64%"
        haveDialog={false}
      />
      {/* locked safe pin point */}
      <InterestPoint
        tooltip={isSafeUnlocked ? 'Unlocked box' : 'Locked box2'}
        handlePinPointClick={() => {
          playMetalSFX();
        }}
        positionBottom="40%"
        positionRight="40%"
        dialogTxt={!isSafeUnlocked ? 'This box have a lock outside!' : 'Morse code - an old telecommunication method'}
        dialogImg={(isSafeUnlocked) ? MorseCodeImg : CombinationLockImg}
        dialogImgStyles={{ height: '50%', width: '50%' }}
        dialogValidate={() => (isSafeUnlocked === false) && handleValidateSafe()}
        haveSubmit={!isSafeUnlocked}
        lockRef={lockedSafeRef}
        lockPass={!isSafeUnlocked && '9632'}
      />
      {/* clue 1 pin point */}
      <InterestPoint
        tooltip="Wooden Box"
        handlePinPointClick={() => playPaperSFX()}
        positionBottom="15%"
        positionRight="5%"
        dialogCustomContent={() => <Clue1Content />}
      />
      {/* locked door to next room pin point */}
      <InterestPoint
        tooltip={isRoomUnlocked ? 'To Main Hall' : 'Locked door'}
        handlePinPointClick={() => {
          if (isRoomUnlocked) {
            gotoPage('/room-3');
            stopMorseCode();
            stopAudio();
          }
        }}
        positionBottom="50%"
        positionRight="10%"
        dialogTxt="Seems like this door lead to another room"
        dialogImg={LockedDoor2Img}
        dialogValidate={() => handleValidateDoor()}
        haveSubmit
        lockRef={lockedDoorRef}
        lockPass="8835"
      />
    </div>
  );
};

export default memo(Room2);
