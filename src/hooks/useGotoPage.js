import { useHistory } from 'react-router-dom';

const useGotoPage = () => {
  const history = useHistory();

  const gotoPage = (path) => {
    history.push(path);
  };

  const goBack = () => {
    history.goBack();
  };

  return { gotoPage, goBack };
};

export default useGotoPage;
