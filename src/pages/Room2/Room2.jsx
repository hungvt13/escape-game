/* eslint-disable no-unused-vars */
import React, {
  useRef, useState, useEffect, memo,
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Typewriter from 'typewriter-effect';

// components
import PinPoint from '../../components/PinPoint/PinPoint';
import Dialog from '../../components/Dialog';
import DialogImage from '../../components/DialogImage/DialogImage';
import LockInput from '../../components/LockInput';
import Transmission from '../Transmisson/Transmission';

// state
import {
  unlockSafe, visitRoom, unlockRoom, changeRoom,
} from '../../state/gameSlice';

// utils
import useGotoPage from '../../hooks/useGotoPage';
import useAudio from '../../hooks/useAudio';

// assets
// import CircoCoImg from '../../assets/images/circo_co.png';
import MoreCodeImg from '../../assets/images/morse_code.png';
import CombinationLockImg from '../../assets/images/combination_lock.png';
import LockedDoor2Img from '../../assets/images/lock_room_2.png';

const Room2 = ({
  playPrevAudio, playAudioNext, stopAudio, supportAudio,
}) => {
  const dispatch = useDispatch();
  const { gotoPage, goBack } = useGotoPage();
  const {
    playPaperSFX, playDoorUnlockedSFX, playDoorLockedSFX, playMetalSFX,
  } = useAudio();
  const { playMorseCode, stopMorseCode } = supportAudio;

  const [firstTransmission, changeTransmission] = useState(true);
  const [lockSafeDialog, toggleLockSafeDialog] = useState(false);
  const [lockDoorDialog, toggleLockDoorDialog] = useState(false);
  const [clue1Dialog, toggleClue1Dialog] = useState(false);
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

  useEffect(() => {
    if (isRoomVisited) changeTransmission(false);
  }, [isRoomVisited]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {
        firstTransmission && (
          <Transmission
            text="You found yourself in the basement of the house..."
            endCallback={() => {
              dispatch(visitRoom('room-2'));
              changeTransmission(false);
            }}
          />
        )
      }
      {/* back to room 1 pin point */}
      <PinPoint
        tooltip="To living room"
        onClick={() => handleBacktoRoom1()}
        style={{
          left: '35%',
          top: '50%',
        }}
      />
      {/* locked safe pin point */}
      <PinPoint
        tooltip={isSafeUnlocked ? 'Unlocked box' : 'Locked box'}
        onClick={() => {
          playMetalSFX();
          toggleLockSafeDialog(true);
        }}
        style={{
          right: '40%',
          bottom: '40%',
        }}
      />
      <Dialog
        open={lockSafeDialog}
        onClose={() => toggleLockSafeDialog(false)}
        dialogText={!isSafeUnlocked ? 'This box have a lock outside!' : 'Morse code - an old telecommunication method'}
        haveSubmit={!isSafeUnlocked}
        onSave={(isSafeUnlocked === false) && handleValidateSafe}
        maxWidth="xs"
      >
        {
          isSafeUnlocked ? (
            <DialogImage imgSrc={MoreCodeImg} imgStyles={{ height: '100%', width: '100%' }} />
          ) : (
            <>
              <DialogImage imgSrc={CombinationLockImg} />
              <LockInput ref={lockedSafeRef} passcode="9632" initValue="9632" />
            </>
          )
        }
      </Dialog>
      {/* clue 1 pin point */}
      <PinPoint
        tooltip="Wooden Box"
        onClick={() => {
          playPaperSFX();
          toggleClue1Dialog(true);
        }}
        style={{
          right: '5%',
          bottom: '15%',
        }}
      />
      <Dialog
        open={clue1Dialog}
        onClose={() => toggleClue1Dialog(false)}
      >
        <div style={{
          width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
        }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString('ON OFF OFF ON OFF ON ON OFF ON OFF OFF OFF OFF OFF')
                .callFunction(() => {
                  console.log('String typed out!');
                })
                .start();
            }}
          />
        </div>
      </Dialog>
      {/* locked door to next room pin point */}
      <PinPoint
        tooltip={isRoomUnlocked ? 'To Main Hall' : 'Locked door'}
        onClick={() => {
          if (isRoomUnlocked) {
            gotoPage('/room-3');
            stopMorseCode();
            stopAudio();
          } else toggleLockDoorDialog(true);
        }}
        style={{
          right: '10%',
          bottom: '50%',
        }}
      />
      <Dialog
        open={lockDoorDialog}
        onClose={() => toggleLockDoorDialog(false)}
        dialogText="Seems like this door lead to another room"
        haveSubmit
        onSave={handleValidateDoor}
      >
        <DialogImage imgSrc={LockedDoor2Img} />
        <LockInput ref={lockedDoorRef} passcode="8835" initValue="8835" />
      </Dialog>
    </div>
  );
};

export default memo(Room2);
