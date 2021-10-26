import React, { memo } from 'react';
import { styled } from '@mui/material/styles';

const scaleDown = 0.6;

const keyFramesBreathing = {
  '@-webkit-keyframes breathing': {
    '0%': {
      transform: `scale(${scaleDown})`,
    },
    '25%': {
      transform: 'scale(1)',
    },
    '60%': {
      transform: `scale(${scaleDown})`,
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
};

const CIRCLE_SIZE = 15;

const StyledPinPoint = styled('div')(() => ({
  width: `${CIRCLE_SIZE}px`,
  height: `${CIRCLE_SIZE}px`,
  position: 'absolute',
  backgroundColor: '#a3a3a3',
  boxShadow: '0px 0px 10px 5px rgba(250,255,174,0.35)',
  borderRadius: 50,
  animation: 'breathing 5s ease-out infinite normal',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#cfcfcf',
    boxShadow: '0px 0px 8px 5px rgba(250,255,174,0.75)',
    'animation-play-state': 'paused',
    animation: 'step-end',
  },
  ...keyFramesBreathing,
}));

const PinPoint = (props) => (
  <StyledPinPoint {...props} />
);

export default memo(PinPoint);
