/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '../Button';
import Dialog from '../Dialog';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  fontFamily: 'arial',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Disclaimer = () => {
  const [open, toggleOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', top: 20, right: 20 }}>
      <Button
        disabled={open}
        color="secondary"
        variant="contained"
        onClick={() => toggleOpen(true)}
        style={{
          fontFamily: 'Arial',
          fontWeight: 'bold',
        }}
      >
        Disclaimers
      </Button>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={() => {
          toggleOpen(false);
        }}
        dialogText="Disclaimers"
      >
        <Div>
          This game is created for purely for recreations and free to play
        </Div>
        <Div>
          It does not reflect / intentionally / unintentionally
        </Div>
        <Div>
          cause harm / damage related subjects borrowed in real life
        </Div>
        <Div>
          <strong>Warning:</strong>
          {' '}
          game contains intense sounds, light strobes, and disturbing graphics!
        </Div>
      </Dialog>
    </div>
  );
};

export default Disclaimer;
