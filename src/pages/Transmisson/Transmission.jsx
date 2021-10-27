import React from 'react';
import Typewriter from 'typewriter-effect';
import Button from '../../components/Button';

const Transmission = ({ text, endCallback }) => (
  <div style={{
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    position: 'absolute',
    zIndex: '99999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
    }}
    >
      <Button onClick={endCallback}>Skip</Button>
    </div>
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString(text)
          .callFunction(() => {
            console.log('String typed out!');
          })
          .pauseFor(2500)
          .callFunction(() => {
            endCallback();
            console.log('All strings were deleted');
          })
          .start();
      }}
    />
  </div>
);

export default Transmission;
