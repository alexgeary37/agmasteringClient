import SlowDownRawMP3 from "../music/Slow_Down_Raw.mp3";
import SlowDownRawWEBM from "../music/Slow_Down_Raw.webm";
import SlowDownMixMP3 from "../music/Slow_Down_Mix.mp3";
import SlowDownMixWEBM from "../music/Slow_Down_Mix.webm";
import SlowDownMasterMP3 from "../music/Slow_Down_Master.mp3";
import SlowDownMasterWEBM from "../music/Slow_Down_Master.webm";
import NearlyThereRawMP3 from "../music/Nearly_There_Raw.mp3";
import NearlyThereRawWEBM from "../music/Nearly_There_Raw.webm";
import NearlyThereMixMP3 from "../music/Nearly_There_Mix.mp3";
import NearlyThereMixWEBM from "../music/Nearly_There_Mix.webm";
import NearlyThereMasterMP3 from "../music/Nearly_There_Master.mp3";
import NearlyThereMasterWEBM from "../music/Nearly_There_Master.webm";
import IsItOverRawMP3 from "../music/Is_It_Over_Raw.mp3";
import IsItOverRawWEBM from "../music/Is_It_Over_Raw.webm";
import IsItOverMixMP3 from "../music/Is_It_Over_Mix.mp3";
import IsItOverMixWEBM from "../music/Is_It_Over_Mix.webm";
import IsItOverMasterMP3 from "../music/Is_It_Over_Master.mp3";
import IsItOverMasterWEBM from "../music/Is_It_Over_Master.webm";

import { Howl } from "howler"; // https://github.com/goldfire/howler.js#documentation

const createHowlInstance = (srcs, v) =>
  new Howl({ src: srcs, volume: v, loop: true });

export const trackData = {
  slowDown: {
    raw: createHowlInstance([SlowDownRawWEBM, SlowDownRawMP3], 1),
    mix: createHowlInstance([SlowDownMixWEBM, SlowDownMixMP3], 0),
    master: createHowlInstance([SlowDownMasterWEBM, SlowDownMasterMP3], 0),
  },
  nearlyThere: {
    raw: createHowlInstance([NearlyThereRawWEBM, NearlyThereRawMP3], 1),
    mix: createHowlInstance([NearlyThereMixWEBM, NearlyThereMixMP3], 0),
    master: createHowlInstance(
      [NearlyThereMasterWEBM, NearlyThereMasterMP3],
      0
    ),
  },
  isItOver: {
    raw: createHowlInstance([IsItOverRawWEBM, IsItOverRawMP3], 1),
    mix: createHowlInstance([IsItOverMixWEBM, IsItOverMixMP3], 0),
    master: createHowlInstance([IsItOverMasterWEBM, IsItOverMasterMP3], 0),
  },
};

export const trackNames = ["Slow Down", "Nearly There", "Is It Over"];

export const numTracks = Object.keys(trackData).length;
