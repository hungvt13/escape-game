import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, ...restProps }) => (
  <MuiButton {...restProps}>
    {children}
  </MuiButton>
);

export default Button;
