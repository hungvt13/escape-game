import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { path } = restOfProps;
  const roomsUnlocked = useSelector((state) => state.root.unlockedRooms);

  const checkIsValid = () => {
    if (path === '/room-2') {
      return roomsUnlocked.includes('room-1');
    } if (path === '/room-3') {
      return roomsUnlocked.includes('room-2') && roomsUnlocked.includes('room-1');
    } if (path === '/outro') {
      return roomsUnlocked.includes('room-3') && roomsUnlocked.includes('room-1') && roomsUnlocked.includes('room-2');
    }

    return true;
  };

  const isAuthenticated = checkIsValid();

  return (
    <Route
      {...restOfProps}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

export default ProtectedRoute;
