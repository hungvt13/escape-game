import { useLocation } from 'react-router-dom';

const backgroundURLMap = {
  '/': 'intro',
  '/room-1': 'room-1',
  '/room-2': 'room-2',
  '/room-3': 'room-3',
};

const useChangeBackground = () => {
  const location = useLocation();
  const { pathname } = location;

  const roomImg = backgroundURLMap[pathname];

  return { roomImg };
};

export default useChangeBackground;
