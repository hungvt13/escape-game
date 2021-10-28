/* eslint-disable react/destructuring-assignment */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getRandomArbitrary } from '../../utils/utils';

const CircularProgressWithLabel = (props) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  </Box>
);

const Loading = () => {
  const [progress, setProgress] = React.useState(10);
  const [isHidden, toggleIsHidden] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 80) {
          clearInterval(timer);
          toggleIsHidden(true);
        }
        return prevProgress + getRandomArbitrary(5, 13);
      });
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div style={{
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
      color: 'white',
    }}
    >
      <CircularProgressWithLabel value={progress} />
    </div>
  );
};

Loading.propTypes = {

};

export default Loading;
