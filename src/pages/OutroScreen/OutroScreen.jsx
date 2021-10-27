/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography } from '@mui/material';
import useGotoPage from '../../hooks/useGotoPage';

import Button from '../../components/Button';

const OutroScreen = () => {
  const { gotoPage } = useGotoPage();

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}
    >
      <div style={{ backgroundColor: 'black', padding: '20px 40px' }}>
        <Typography variant="h1" component="div" gutterBottom>
          Escaped !
        </Typography>

      </div>
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => gotoPage('/')} variant="contained">Back to menu</Button>
      </div>
    </div>
  );
};

export default OutroScreen;
