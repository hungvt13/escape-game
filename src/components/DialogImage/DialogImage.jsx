import React from 'react';

const DialogImage = ({ imgSrc, imgStyles = {} }) => {
  // eslint-disable-next-line no-unused-vars
  const a = 'temp';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={imgSrc}
        alt="yojee-company-logo"
        style={{
          height: '80%',
          width: '80%',
          ...imgStyles,
        }}
      />
    </div>
  );
};

export default DialogImage;
