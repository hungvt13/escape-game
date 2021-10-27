/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { red } from '@mui/material/colors';
import Button from '../Button';

const originalAlphabet = 'abcdefghijklmnopqrstuvwxyz';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const itemStyles = {
  padding: 5,
};

const AlphabetList = ({ arr, borderColor, keyName }) => (
  <Grid item xs={3} md={1} style={containerStyles}>
    {
        arr.map((item) => (
          <div
            key={`cipher-${keyName}-${item}`}
            style={{
              border: '2px solid',
              borderColor,
              ...itemStyles,
            }}
          >
            {item}
          </div>
        ))
      }
  </Grid>
);

const CaesarDecrypter = () => {
  const [originalAlpha, setOriginalAlpha] = useState(originalAlphabet.split(''));
  const [shiftedAlpha, setShiftedAlpha] = useState(originalAlphabet.split(''));
  const [currentShift, changeCurrentShift] = useState(0);

  const handleShift = (num) => {
    changeCurrentShift((prevState) => prevState + num);
    if (num > 0) {
      setShiftedAlpha((prevState) => {
        const clonedArr = [...prevState];
        const lastChar = clonedArr.pop();
        return [lastChar, ...clonedArr];
      });
    } else if (num < 0) {
      setShiftedAlpha((prevState) => {
        const [firstChar, ...restChars] = prevState;

        return [...restChars, firstChar];
      });
    }
  };

  return (
    <Grid
      container
      style={{
        color: 'white', position: 'relative', height: '100vh', overflow: 'auto',
      }}
    >
      <div style={{
        position: 'fixed', right: 20, top: '50%', minWidth: '10vw',
      }}
      >
        <div style={{ padding: '20px 10px', textAlign: 'center', backgroundColor: red[700] }}>
          SHIFTED:
          {' '}
          {currentShift}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={() => handleShift(-1)} color="primary" aria-label="upload picture" component="span">
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleShift(1)} color="primary" aria-label="upload picture" component="span">
            <KeyboardArrowUpIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      {/* original letter container  */}
      <AlphabetList arr={originalAlpha} keyName="original" borderColor="white" />
      {/* shifted letter container  */}
      <AlphabetList arr={shiftedAlpha} keyName="shifted" borderColor="#e33232" />
    </Grid>
  );
};

export default CaesarDecrypter;
