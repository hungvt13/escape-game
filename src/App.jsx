/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// page components
import IntroScreen from './pages/IntroScreen';
import OutroScreen from './pages/OutroScreen';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';
import Room3 from './pages/Room3';
import CipherPage from './pages/CaesarCipher';

// utils
import usePlayBgAudio from './hooks/usePlayBgAudio';

const App = () => {
  const {
    playRoom1Bg, playRoom2Bg, playRoom3Bg, playMorseCode, stopRoom1Bg, stopRoom2Bg, stopRoom3Bg, stopMorseCode,
  } = usePlayBgAudio();
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
              <IntroScreen playAudioNext={playRoom1Bg} />
            </Route>
            <Route path="/room-1" exact>
              <Room1 playAudioNext={playRoom2Bg} stopAudio={stopRoom1Bg} />
            </Route>
            <ProtectedRoute path="/room-2" exact component={() => <Room2 playPrevAudio={playRoom1Bg} playAudioNext={playRoom3Bg} stopAudio={stopRoom2Bg} supportAudio={{ playMorseCode, stopMorseCode }} />} />
            <ProtectedRoute path="/room-3" exact component={() => <Room3 playPrevAudio={playRoom2Bg} playAudioNext={playRoom1Bg} stopAudio={stopRoom3Bg} />} />
            <ProtectedRoute path="/outro" exact component={OutroScreen} />
            <Route path="/cipher" exact>
              <CipherPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Background>
      </Router>
    </ThemeProvider>
  );
};

export default App;
