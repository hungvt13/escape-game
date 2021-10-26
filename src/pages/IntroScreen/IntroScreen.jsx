import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Button from '../../components/Button';
import useGotoPage from '../../hooks/useGotoPage';

const Container = styled(Grid)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  color: 'white',
});

const IntroScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const { gotoPage } = useGotoPage();

  const onClickStart = () => {
    gotoPage('/room-1');
  };

  return (
    <Container>
      <div>
        <Button
          onClick={onClickStart}
          style={{
            bottom: 100,
            marginRight: 10,
          }}
          variant="contained"
        >
          Start
        </Button>
        <Button
          style={{
            bottom: 100,
          }}
          variant="contained"
        >
          Reset
        </Button>
      </div>
    </Container>
  );
};

export default memo(IntroScreen);
