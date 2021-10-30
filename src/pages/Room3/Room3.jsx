/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, {
  useRef, useState, useEffect, memo,
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

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
import CaesarImg from '../../assets/images/julius_caesar.png';
import CombinationLockImg from '../../assets/images/combination_lock.png';
import LockedDoorImg from '../../assets/images/locked_door.png';
import QRCodeImg from '../../assets/images/qr_code.png';
import DecryptedMessImg from '../../assets/images/last_code.png';

const Room3 = ({ playPrevAudio, playAudioNext, stopAudio }) => {
  const dispatch = useDispatch();
  const { gotoPage } = useGotoPage();
  const {
    playPaperSFX,
    playDoorUnlockedSFX,
    playDoorLockedSFX,
    playMetalSFX,
    playPaintingSFX,
    playHeavyDoorSFX,
  } = useAudio();

  const [firstTransmission, changeTransmission] = useState(true);
  const [decyptedDialog, toggleDecryptedDialog] = useState(false);
  const [lockSafeCipherDialog, toggleLockSafeCipherDialog] = useState(false);
  const [lockDoorDialog, toggleLockDoorDialog] = useState(false);
  const [caesarDialog, toggleCaesarDialog] = useState(false);

  const lockedCipherSafeRef = useRef();
  const lockedDoorRef = useRef();

  const room3CipherSafeUnlocked = useSelector((state) => state.root.room3CipherSafeUnlocked);
  const isRoomUnlocked = useSelector((state) => state.root.unlockedRooms.includes('room-3'), shallowEqual);
  const isRoomVisited = useSelector((state) => state.root.visitedRooms.includes('room-3'), shallowEqual);

  useEffect(() => {
    dispatch(changeRoom('room-3'));
  }, []);

  useEffect(() => {
    if (isRoomVisited) changeTransmission(false);
  }, [isRoomVisited]);

  const handleBacktoRoom2 = () => {
    stopAudio();
    playPrevAudio();
    gotoPage('/room-2');
  };

  const handleValidateCipherSafe = () => {
    const isValid = lockedCipherSafeRef.current.getCurrentStatus();
    if (isValid) {
      dispatch(unlockSafe('room3CipherSafeUnlocked'));
      playDoorUnlockedSFX();
    } else {
      playDoorLockedSFX();
    }

    return isValid;
  };

  const handleValidateFinalDoor = () => {
    const isValid = lockedDoorRef.current.getCurrentStatus();
    if (isValid) {
      if (!isRoomUnlocked) {
        dispatch(unlockRoom('room-3'));
      }
      stopAudio();
      playAudioNext();
      playDoorUnlockedSFX();
      gotoPage('/outro');
    } else {
      playDoorLockedSFX();
    }

    return isValid;
  };

  return (
    <div>
      {
        firstTransmission && (
          <Transmission
            text="You opened the door, you found yourself in the Main Hall..."
            endCallback={() => {
              dispatch(visitRoom('room-3'));
              changeTransmission(false);
            }}
          />
        )
      }
      {/* back to room 2 pin point */}
      <PinPoint
        tooltip="Back to basement"
        onClick={() => handleBacktoRoom2()}
        style={{
          left: '10%',
          bottom: '10%',
        }}
      />
      {/* Julius Caesar pin point */}
      <PinPoint
        tooltip="A torn picture"
        onClick={() => {
          playPaintingSFX();
          toggleCaesarDialog(true);
        }}
        style={{
          left: '32%',
          top: '38%',
        }}
      />
      <Dialog
        open={caesarDialog}
        onClose={() => toggleCaesarDialog(false)}
        dialogText={(
          <div>
            Gaius Julius Caesar (100BC t 44BC)
            <br />
            One of the greatest general in the world&apos;s history
          </div>
        )}
      >
        <DialogImage imgSrc={CaesarImg} />
      </Dialog>
      {/* Safe cipher pin point */}
      <PinPoint
        tooltip="Something behind the painting"
        onClick={() => {
          playMetalSFX();
          toggleLockSafeCipherDialog(true);
        }}
        style={{
          left: '27%',
          top: '18%',
        }}
      />
      <Dialog
        open={lockSafeCipherDialog}
        maxWidth="md"
        onClose={() => toggleLockSafeCipherDialog(false)}
        dialogText={(room3CipherSafeUnlocked) ? '7' : 'Locked safe'}
        haveSubmit={!room3CipherSafeUnlocked}
        onSave={() => {
          if (!room3CipherSafeUnlocked) handleValidateCipherSafe();
        }}
      >
        {
          room3CipherSafeUnlocked ? (
            <DialogImage imgSrc={QRCodeImg} imgStyles={{ width: '50%', height: '50%' }} />
          ) : (
            <>
              <DialogImage imgSrc={CombinationLockImg} />
              <LockInput ref={lockedCipherSafeRef} passcode="144" />
            </>
          )
        }
      </Dialog>

      {/* Decrypted mess pin point */}
      <PinPoint
        tooltip="A torn picture"
        onClick={() => {
          playPaperSFX();
          toggleDecryptedDialog(true);
        }}
        style={{
          right: '18%',
          top: '28%',
        }}
      />
      <Dialog
        open={decyptedDialog}
        onClose={() => toggleDecryptedDialog(false)}
      >
        <DialogImage imgSrc={DecryptedMessImg} imgStyles={{ width: '50%', height: '50%' }} />
      </Dialog>
      {/* Locked door pin point */}
      <PinPoint
        tooltip="Locked safe"
        onClick={() => {
          playHeavyDoorSFX();
          toggleLockDoorDialog(true);
        }}
        style={{
          right: '50%',
          top: '30%',
        }}
      />
      <Dialog
        open={lockDoorDialog}
        onClose={() => toggleLockDoorDialog(false)}
        dialogText="I must open this door to get out!"
        haveSubmit
        onSave={handleValidateFinalDoor}
      >
        <DialogImage imgSrc={LockedDoorImg} />
        <LockInput ref={lockedDoorRef} passcode="pumpkin" />
      </Dialog>
    </div>
  );
};

export default memo(Room3);
