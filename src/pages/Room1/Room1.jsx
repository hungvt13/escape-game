/* eslint-disable no-unused-vars */
import React, {
  memo, useEffect, useState, useRef,
} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// state
import { changeRoom, unlockRoom, visitRoom } from '../../state/gameSlice';

// components
import PinPoint from '../../components/PinPoint/PinPoint';
import Dialog from '../../components/Dialog';
import DialogImage from '../../components/DialogImage/DialogImage';
import LockInput from '../../components/LockInput';
import Transmission from '../Transmisson/Transmission';

// assets
import YojeeLogoImg from '../../assets/images/yojee_logo.png';
import CombinationLockImg from '../../assets/images/combination_lock.png';

// utils
import useGotoPage from '../../hooks/useGotoPage';
import useAudio from '../../hooks/useAudio';

const Room1 = ({ playAudioNext, stopAudio }) => {
  const dispatch = useDispatch();
  const { gotoPage } = useGotoPage();
  const { playPaperSFX, playDoorUnlockedSFX, playDoorLockedSFX } = useAudio();

  const [noteDialog, toggleNoteDialog] = useState(false);
  const [lockDialog, toggleLockDialog] = useState(false);
  const [firstTransmission, changeTransmission] = useState(true);

  const isRoomUnlocked = useSelector((state) => state.root.unlockedRooms.includes('room-1'), shallowEqual);
  const isRoomVisited = useSelector((state) => state.root.visitedRooms.includes('room-1'), shallowEqual);

  const lockRef = useRef();

  useEffect(() => {
    dispatch(changeRoom('room-1'));
  }, []);

  useEffect(() => {
    if (isRoomVisited) changeTransmission(false);
  }, [isRoomVisited]);

  const handleValidateDoor = () => {
    const isValid = lockRef.current.getCurrentStatus();
    // eslint-disable-next-line no-empty
    if (isValid) {
      if (!isRoomUnlocked) {
        dispatch(unlockRoom('room-1'));
      }
      playDoorUnlockedSFX();
      stopAudio();
      playAudioNext();
      gotoPage('/room-2');
    } else {
      playDoorLockedSFX();
    }

    return isValid;
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {
        firstTransmission && (
          <Transmission
            text="You slowly waking up, last thing you remember was drinking with someone at a Halloween's party ..."
            endCallback={() => {
              dispatch(visitRoom('room-1'));
              changeTransmission(false);
            }}
          />
        )
      }
      {/* clue pin point */}
      <PinPoint
        tooltip="An old book"
        onClick={() => {
          playPaperSFX();
          toggleNoteDialog(true);
        }}
        style={{
          bottom: '35%',
          left: '25%',
        }}
      />
      <Dialog
        open={noteDialog}
        onClose={() => {
          playPaperSFX();
          toggleNoteDialog(false);
        }}
        dialogText="Yojee's stock (ASX:YOJ) reached all time high (AUD) on February 18th, 2011"
      >
        <DialogImage imgSrc={YojeeLogoImg} />
      </Dialog>
      {/* lock pin point */}
      <PinPoint
        tooltip={isRoomUnlocked ? 'To basement' : 'Locked door'}
        onClick={() => {
          if (isRoomUnlocked) {
            stopAudio();
            playAudioNext();
            gotoPage('/room-2');
          } else toggleLockDialog(true);
        }}
        style={{
          top: '20%',
          right: '10%',
        }}
      />
      <Dialog
        open={lockDialog}
        onClose={() => toggleLockDialog(false)}
        dialogText="This door is locked!"
        haveSubmit
        onSave={handleValidateDoor}
      >
        <DialogImage imgSrc={CombinationLockImg} />
        <LockInput ref={lockRef} passcode="0.41" />
      </Dialog>
    </div>
  );
};

export default memo(Room1);
