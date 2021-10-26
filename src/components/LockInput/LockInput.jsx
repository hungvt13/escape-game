import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextField } from '@mui/material';

const ERROR_TEXT = 'Wrong code!';

const LockInput = ({ passcode, initValue = '0' }, ref) => {
  const [passValue, changePassValue] = useState(initValue);
  const [error, setError] = useState('');

  useImperativeHandle(
    ref,
    () => ({
      getCurrentStatus() {
        const isValid = passValue === passcode;
        if (!isValid) setError(ERROR_TEXT);
        return isValid;
      },
    }),
    [passValue],
  );

  const handleOnChange = (value) => {
    changePassValue(value);
    setError('');
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10,
    }}
    >
      <TextField
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
        value={passValue}
        onChange={(e) => handleOnChange(e.target.value)}
        variant="filled"
        type="number"
        error={!!error}
        helperText={error}
      />
    </div>
  );
};

export default forwardRef(LockInput);
