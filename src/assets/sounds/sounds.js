import beep from "./Beep-tone.mp3";
import error from "./beep-error.mp3";

// sound func for playing sound effects
export const playSound = val => {
  let sound;
  if (val === "Error") {
    sound = new Audio(error);
    return sound.play();
  }
  sound = new Audio(beep);
  return sound.play();
};
