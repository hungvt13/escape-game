import React from 'react';

import Button from '../Button';

import useGotoPage from '../../hooks/useGotoPage';

const Navbar = () => {
  const { gotoPage } = useGotoPage();

  const handleNav = (to) => {
    gotoPage(to);
  };

  return (
    <div>
      <Button onClick={() => handleNav('/room-1')} style={{ marginRight: 10 }}>Room 1</Button>
      <Button onClick={() => handleNav('/room-2')} style={{ marginRight: 10 }}>Room 2</Button>
      <Button onClick={() => handleNav('/room-3')}>Room 3</Button>
    </div>
  );
};

export default Navbar;
