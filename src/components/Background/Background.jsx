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

const backgroundsMap = {
  intro: IntroBg,
  'room-1': Room1Bg,
  'room-2': Room2Bg,
};

const BackgroundDiv = styled(Grid)((props) => ({
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundsMap[props.room]})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '100vw 100vh',
}));

const Background = ({ children }) => {
  const { roomImg } = useChangeBackground();

  return (
    <BackgroundDiv room={roomImg}>
      {children}
    </BackgroundDiv>
  );
};

export default memo(Background);
