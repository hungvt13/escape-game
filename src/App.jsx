import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// components
import Background from './components/Background';

// page components
import IntroScreen from './pages/IntroScreen';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';

const App = () => {
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: 'dark',
      },
    }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Background>
          <Switch>
            <Route path="/" exact>
              <IntroScreen />
            </Route>
            <Route path="/room-1" exact>
              <Room1 />
            </Route>
            <Route path="/room-2" exact>
              <Room2 />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Background>
      </Router>
    </ThemeProvider>
  );
};

export default App;
