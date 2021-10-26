import React from 'react';

import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '../Button';

const Dialog = ({
  open, onClose, children, dialogText, haveSubmit, onSave,
}) => (
  <MuiDialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="lg"
  >
    <DialogContent>
      {children}
      <DialogContentText style={{ textAlign: 'center', marginTop: 10 }}>
        {dialogText}
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button onClick={onClose}>Close</Button>
      {
        haveSubmit && <Button onClick={onSave}>Unlock</Button>
      }
    </DialogActions>
  </MuiDialog>
);

export default Dialog;
