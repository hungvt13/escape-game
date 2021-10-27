/* eslint-disable no-unused-vars */
import React from 'react';

import { Grid } from '@mui/material';
import CaesarDecrypter from '../../components/CaesarDecrypter/CaesarDecrypter';

const CaesarCipher = () => {
  const a = 'temp';

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CaesarDecrypter />
    </div>
  );
};

export default CaesarCipher;
