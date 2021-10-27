/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// utils
import useChangeBackground from '../../hooks/useChangeBackground';

// background images
import IntroBg from '../../assets/images/intro_screen.jpg';
import Room1Bg from '../../assets/images/room_1.png';
import Room2Bg from '../../assets/images/room_2.png';
import Room3Bg from '../../assets/images/room_3.png';
import CipherBg from '../../assets/images/cipher_bg.png';
import OutroBg from '../../assets/images/outro_bg.png';

const backgroundsMap = {
  intro: IntroBg,
  'room-1': Room1Bg,
  'room-2': Room2Bg,
  'room-3': Room3Bg,
  outro: OutroBg,
  cipher: CipherBg,
};

const titleMap = {
  intro: 'Welcome',
  'room-1': 'The Room',
  'room-2': 'The Basement',
  'room-3': 'The Hall',
  outro: 'Run',
  cipher: 'Decrypt Tool',
};

const shadowKeyFramesFlashing = {
  '@keyframes flashing': {
    '50%': {
      boxShadow: 'inset 0px 0px 150px 30px rgba(0,0,0,0.64)',
    },

  },
};

const BackgroundDiv = styled(Grid)((props) => ({
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundsMap[props.room]})`,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
  backgroundSize: '100vw 100vh',
  animation: 'flashing 5s ease-out infinite normal',
  ...shadowKeyFramesFlashing,
}));

const Background = ({ children }) => {
  const { roomLocation } = useChangeBackground();
  document.title = `Escape Game - ${titleMap[roomLocation]}`;

  return (
    <BackgroundDiv room={roomLocation}>
      {children}
    </BackgroundDiv>
  );
};

export default memo(Background);
