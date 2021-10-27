/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from 'react';
import useSound from 'use-sound';

// background audio files
import room1BgSFX from '../assets/sounds/room_1_sfx.mp3';
import room2BgSFX from '../assets/sounds/room_2_sfx.mp3';
import room3BgSFX from '../assets/sounds/room_3_sfx.mp3';
import morseCodeSFX from '../assets/sounds/morse_code_sfx.mp3';

const BG_MUSIC = true;

const room1duration = 244000; // 4 mins 4 secs
const room2duration = 150000; // 2 mins 30 secs
const room3duration = 178000; // 2 mins 50 secs
const morseInterval = 15000; // 15 secs

const usePlayBgAudio = () => {
  const intervalRoom1Music = useRef(null);
  const intervalRoom2Music = useRef(null);
  const intervalRoom3Music = useRef(null);
  const intervalMorseCode = useRef(null);

  const [playRoom1BgOringal, { stop: stopRoom1BgOringal }] = useSound(room1BgSFX, { volume: 0.08, interrupt: true });
  const [playRoom2BgOringal, { stop: stopRoom2BgOringal }] = useSound(room2BgSFX, { volume: 0.08, interrupt: true });
  const [playRoom3BgOringal, { stop: stopRoom3BgOringal }] = useSound(room3BgSFX, { volume: 0.08, interrupt: true });
  const [playMorseCodeOringal, { stop: stopMorseCodeOringal }] = useSound(morseCodeSFX, { volume: 0.005, interrupt: true, playbackRate: 0.5 });

  const memorizedFunc = useCallback(
    (fn, intervalStorage, duration = null) => () => {
      if (duration && BG_MUSIC) {
        fn();
        clearInterval(intervalStorage.current);
        // eslint-disable-next-line no-param-reassign
        intervalStorage.current = setInterval(() => {
          fn();
        }, duration);
      } else {
        clearInterval(intervalStorage.current);
        fn();
      }
    },
    [intervalRoom1Music, intervalRoom2Music, intervalRoom3Music],
  );

  const playRoom1Bg = memorizedFunc(playRoom1BgOringal, intervalRoom1Music, room1duration);
  const playRoom2Bg = memorizedFunc(playRoom2BgOringal, intervalRoom2Music, room2duration);
  const playRoom3Bg = memorizedFunc(playRoom3BgOringal, intervalRoom3Music, room3duration);
  const playMorseCode = memorizedFunc(playMorseCodeOringal, intervalMorseCode, morseInterval);
  const stopRoom1Bg = memorizedFunc(stopRoom1BgOringal, intervalRoom1Music);
  const stopRoom2Bg = memorizedFunc(stopRoom2BgOringal, intervalRoom2Music);
  const stopRoom3Bg = memorizedFunc(stopRoom3BgOringal, intervalRoom3Music);
  const stopMorseCode = memorizedFunc(stopMorseCodeOringal, intervalMorseCode);

  return {
    playRoom1Bg, playRoom2Bg, playRoom3Bg, stopRoom1Bg, stopRoom2Bg, stopRoom3Bg, playMorseCode, stopMorseCode,
  };
};

export default usePlayBgAudio;
