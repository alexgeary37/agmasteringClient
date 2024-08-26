import SlowDownRawMP3 from "../music/Slow_Down_Raw.mp3";
import SlowDownRawWEBM from "../music/Slow_Down_Raw.webm";
import SlowDownMixMP3 from "../music/Slow_Down_Mix.mp3";
import SlowDownMixWEBM from "../music/Slow_Down_Mix.webm";
import SlowDownMasterMP3 from "../music/Slow_Down_Master.mp3";
import SlowDownMasterWEBM from "../music/Slow_Down_Master.webm";

import { Howl } from "howler"; // https://github.com/goldfire/howler.js#documentation

export const createHowlInstance = (srcs, v) =>
  new Howl({ src: srcs, volume: v, loop: true });

export const trackData = [
  {
    raw: createHowlInstance([SlowDownRawWEBM, SlowDownRawMP3], 1),
    mix: createHowlInstance([SlowDownMixWEBM, SlowDownMixMP3], 0),
    master: createHowlInstance([SlowDownMasterWEBM, SlowDownMasterMP3], 0),
  },
  null,
  null,
];

export const trackNames = ["Slow Down", "Nearly There", "Is It Over"];

export const numTracks = trackData.length;
