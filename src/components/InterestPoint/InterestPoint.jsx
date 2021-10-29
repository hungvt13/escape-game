/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import PinPoint from '../PinPoint/PinPoint';
import Dialog from '../Dialog';
import DialogImage from '../DialogImage/DialogImage';
import LockInput from '../LockInput';

const InterestPoint = ({
  tooltip,
  handlePinPointClick,
  handleDialogClose,
  positionTop,
  positionBottom,
  positionLeft,
  positionRight,
  haveDialog = true,
  dialogImg,
  dialogImgStyles,
  dialogCustomContent: CustomComponent,
  dialogTxt,
  haveSubmit,
  dialogValidate,
  lockRef,
  lockPass,
}) => {
  const [open, toggleOpen] = useState(false);

  return (
    <>
      <PinPoint
        tooltip={tooltip}
        onClick={() => {
          toggleOpen(true);
          !!handlePinPointClick && handlePinPointClick();
        }}
        style={{
          ...(positionTop ? { top: positionTop } : {}),
          ...(positionBottom ? { bottom: positionBottom } : {}),
          ...(positionLeft ? { left: positionLeft } : {}),
          ...(positionRight ? { right: positionRight } : {}),
        }}
      />
      {
        (haveDialog) && (
          <Dialog
            open={open}
            onClose={() => {
              toggleOpen(false);
              !!handleDialogClose && handleDialogClose();
            }}
            dialogText={dialogTxt}
            haveSubmit={haveSubmit}
            onSave={dialogValidate}
          >
            {
              (CustomComponent) && <CustomComponent />
            }
            {
              (dialogImg) && <DialogImage imgSrc={dialogImg} imgStyles={dialogImgStyles} />
            }
            {
              (lockPass) && <LockInput ref={lockRef} passcode={lockPass} />
            }
          </Dialog>
        )
      }
    </>
  );
};

export default InterestPoint;
