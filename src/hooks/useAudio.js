/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import useSound from 'use-sound';

// SFX audio files
import DoorUnlockedSFX from '../assets/sounds/door_unlocked_sfx.mp3';
import PaperSFX from '../assets/sounds/paper_sfx.mp3';
import MetalSFX from '../assets/sounds/metal_box_sfx.mp3';
import PaintingSFX from '../assets/sounds/painting_sfx.mp3';

let intervalDoorLocked;
let counterDoorLocked = 0;

const useAudio = () => {
  const [playDoorUnlockedSFX, { stop: stopDoorUnlockedSFX }] = useSound(DoorUnlockedSFX, { volume: 0.5 });
  const [playPaperSFX, { stop: stopPaperSFX }] = useSound(PaperSFX, { volume: 0.5, interrupt: true });
  const [playMetalSFX, { stop: stopMetalSFX }] = useSound(MetalSFX, { volume: 0.3, interrupt: true });
  const [playPaintingSFX, { stop: stopPaintingSFX }] = useSound(PaintingSFX, { volume: 3, interrupt: true });
  const [playHeavyDoorSFX, { stop: stopHeavyDoorSFX }] = useSound(MetalSFX, { volume: 0.3, interrupt: true, playbackRate: 0.2 });

  const playDoorLockedSFX = () => {
    clearInterval(intervalDoorLocked);

    intervalDoorLocked = setInterval(() => {
      if (counterDoorLocked === 3) {
        clearInterval(intervalDoorLocked);
        counterDoorLocked = 0;
        return;
      }
      counterDoorLocked += 1;
      playDoorUnlockedSFX();
    }, 100);
  };

  return {
    playDoorUnlockedSFX,
    playDoorLockedSFX,
    playPaperSFX,
    playMetalSFX,
    playPaintingSFX,
    playHeavyDoorSFX,
  };
};

export default useAudio;
