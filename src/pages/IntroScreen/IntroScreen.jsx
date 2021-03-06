/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid } from '@mui/material';
import Button from '../../components/Button';
import useGotoPage from '../../hooks/useGotoPage';
import useAudio from '../../hooks/useAudio';
import { resetGame, changeRoom } from '../../state/gameSlice';
import Disclaimer from '../../components/Disclaimer/Disclaimer';
import { isGameNotPlayed } from '../../state/selectors';

const Container = styled(Grid)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  color: 'white',
});

const IntroScreen = ({ playAudioNext }) => {
  const dispatch = useDispatch();
  const { gotoPage } = useGotoPage();
  const { playDoorUnlockedSFX } = useAudio();
  const isNewGame = useSelector(isGameNotPlayed);

  useEffect(() => {
    dispatch(changeRoom('intro'));
  }, []);

  const onClickStart = () => {
    playDoorUnlockedSFX();
    playAudioNext();
    gotoPage('/room-1');
  };

  return (
    <Container>
      <Disclaimer />
      <div>
        <Button
          onClick={onClickStart}
          style={{
            bottom: 100,
            marginRight: 10,
          }}
        >
          {isNewGame ? 'Start' : 'Continue'}
        </Button>
        {
          !isNewGame && (
          <Button
            onClick={() => dispatch(resetGame())}
            style={{
              bottom: 100,
            }}
          >
            Reset
          </Button>
          )
        }
      </div>
    </Container>
  );
};

export default memo(IntroScreen);
