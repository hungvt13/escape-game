import React, {
  memo, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// state
import { changeRoom, unlockRoom, visitRoom } from '../../state/gameSlice';

// components
import Transmission from '../Transmisson/Transmission';
import InterestPoint from '../../components/InterestPoint/InterestPoint';

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

  const isRoomUnlocked = useSelector((state) => state.root.unlockedRooms.includes('room-1'), shallowEqual);
  const isRoomVisited = useSelector((state) => state.root.visitedRooms.includes('room-1'), shallowEqual);

  const lockRef = useRef();

  useEffect(() => {
    dispatch(changeRoom('room-1'));
  }, []);

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
        !isRoomVisited && (
          <Transmission
            text="You slowly waking up, last thing you remember was drinking with someone at a Halloween's party ..."
            endCallback={() => {
              dispatch(visitRoom('room-1'));
            }}
          />
        )
      }
      {/* clue pin point */}
      <InterestPoint
        tooltip="An old book"
        handlePinPointClick={() => {
          playPaperSFX();
        }}
        positionBottom="30%"
        positionRight="75%"
        handleDialogClose={() => {
          playPaperSFX();
        }}
        dialogTxt="Yojee's stock (ASX:YOJ) reached all time high (AUD) on February 18th, 2011"
        dialogImg={YojeeLogoImg}
      />
      {/* lock pin point */}
      <InterestPoint
        tooltip={isRoomUnlocked ? 'To basement' : 'Locked door'}
        handlePinPointClick={() => {
          if (isRoomUnlocked) {
            stopAudio();
            playAudioNext();
            gotoPage('/room-2');
          }
        }}
        positionBottom="70%"
        positionRight="10%"
        handleDialogClose={() => {
          playPaperSFX();
        }}
        haveSubmit
        dialogTxt="Seems like it can be unlocked by numbers"
        dialogImg={CombinationLockImg}
        dialogValidate={handleValidateDoor}
        lockRef={lockRef}
        lockPass="0.41"
      />
    </div>
  );
};

export default memo(Room1);
