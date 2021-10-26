import React, {
  memo, useEffect, useState, useRef,
} from 'react';
import { useDispatch } from 'react-redux';

// state
import { changeRoom } from '../../state/gameSlice';

// components
import PinPoint from '../../components/PinPoint/PinPoint';
import Dialog from '../../components/Dialog';
import DialogImage from '../../components/DialogImage/DialogImage';
import LockInput from '../../components/LockInput';

// assets
import YojeeLogoImg from '../../assets/images/yojee_logo.png';
import CombinationLockImg from '../../assets/images/combination_lock.png';

// utils
import useGotoPage from '../../hooks/useGotoPage';

const Room1 = () => {
  const dispatch = useDispatch();
  const { gotoPage } = useGotoPage();

  const [noteDialog, toggleNoteDialog] = useState(false);
  const [lockDialog, toggleLockDialog] = useState(false);

  const lockRef = useRef();

  useEffect(() => {
    dispatch(changeRoom('room-1'));
  }, []);

  const checkIsValid = () => {
    const isValid = lockRef.current.getCurrentStatus();
    // eslint-disable-next-line no-empty
    if (gotoPage('/room-2')) {}
    return isValid;
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* clue pin point */}
      <PinPoint
        onClick={() => toggleNoteDialog(true)}
        style={{
          bottom: '35%',
          left: '25%',
        }}
      />
      {/* lock pin point */}
      <PinPoint
        onClick={() => toggleLockDialog(true)}
        style={{
          top: '20%',
          right: '10%',
        }}
      />
      <Dialog
        open={noteDialog}
        onClose={() => toggleNoteDialog(false)}
        dialogText="Yojee's stock (ASX:YOJ) reached all time high on January 5th, 2018"
      >
        <DialogImage imgSrc={YojeeLogoImg} />
      </Dialog>
      <Dialog
        open={lockDialog}
        onClose={() => toggleLockDialog(false)}
        dialogText="The door is locked!"
        haveSubmit
        onSave={checkIsValid}
      >
        <DialogImage imgSrc={CombinationLockImg} />
        <LockInput ref={lockRef} passcode="0.32" initValue="0.32" />
      </Dialog>
    </div>
  );
};

export default memo(Room1);
