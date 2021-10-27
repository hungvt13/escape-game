import { useLocation } from 'react-router-dom';

const backgroundURLMap = {
  '/': 'intro',
  '/room-1': 'room-1',
  '/room-2': 'room-2',
  '/room-3': 'room-3',
  '/outro': 'outro',
  '/cipher': 'cipher',
};

const useChangeBackground = () => {
  const location = useLocation();
  const { pathname } = location;

  const roomLocation = backgroundURLMap[pathname];

  return { roomLocation };
};

export default useChangeBackground;
