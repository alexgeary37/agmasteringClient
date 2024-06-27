import Slow_Down_Raw_MP3 from "../../music/Slow_Down_Raw.mp3";
import Slow_Down_Raw_WEBM from "../../music/Slow_Down_Raw.webm";
import Slow_Down_Mix_MP3 from "../../music/Slow_Down_Mix.mp3";
import Slow_Down_Mix_WEBM from "../../music/Slow_Down_Mix.mp3";
import Slow_Down_Master_MP3 from "../../music/Slow_Down_Master.mp3";
import Slow_Down_Master_WEBM from "../../music/Slow_Down_Master.mp3";
import {
  Box,
  Container,
  IconButton,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import {
  PlayArrowRounded,
  PauseRounded,
  // SkipPrevious,
  // SkipNext,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
// https://github.com/goldfire/howler.js#documentation

const MuiToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "rgba(0,0,121,0.5)",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  color: "white",
  fontWeight: 500,
  letterSpacing: 0.2,
  textAlign: "center",
});

const trackNames = ["Slow Down", "Track 2", "Track 3333"];

const bgColours = [
  "linear-gradient(90deg, rgba(63,63,66,1) 0%, rgba(213,218,219,1) 100%)",
  "linear-gradient(90deg, rgba(32,32,96,1) 0%, rgba(104,185,194,1) 70%)",
  "linear-gradient(90deg, rgba(0,0,107,1) 0%, rgba(0,232,255,1) 70%)",
];

const original1 = new Howl({
  src: [Slow_Down_Raw_WEBM, Slow_Down_Raw_MP3],
  volume: 1,
  loop: true,
});
const mixed1 = new Howl({
  src: [Slow_Down_Mix_WEBM, Slow_Down_Mix_MP3],
  volume: 0,
  loop: true,
});
const mastered1 = new Howl({
  src: [Slow_Down_Master_WEBM, Slow_Down_Master_MP3],
  volume: 0,
  loop: true,
});

// const original2 = new Howl({
//   src: [Anymore_Pacific_Master],
//   volume: 1,
//   loop: true,
// });
// const mixed2 = new Howl({
//   src: [Anymore_Pacific_Master],
//   volume: 0,
//   loop: true,
// });
// const mastered2 = new Howl({
//   src: [Anymore_Pacific_Master],
//   volume: 0,
//   loop: true,
// });

export default function AudioPlayer() {
  const [paused, setPaused] = useState(true);
  const [trackNumber, setTrackNumber] = useState(0);
  const [position, setPosition] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);
  const [duration, setDuration] = useState(0);
  const [version, setVersion] = useState("ORIGINAL");
  const [bgColour, setBgColour] = useState(0);

  const original = useRef(null);
  const mixed = useRef(null);
  const mastered = useRef(null);
  const playInterval = useRef(null);

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondsLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  // Do this only once when the page loads first time.
  useEffect(() => {
    loadAudioFiles();
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    selectVersion();
    // eslint-disable-next-line
  }, [version]);

  useEffect(() => {
    // Only allow after first track has been loaded.
    if (mastered.current._state === "loaded") {
      switchVersion();
    } // eslint-disable-next-line
  }, [trackNumber]);

  const loadAudioFiles = () => {
    original.current = original1;
    mixed.current = mixed1;
    mastered.current = mastered1;

    mastered.current.on("load", () => {
      setDuration(mastered.current.duration());
    });
  };

  const stop = () => {
    original.current.stop();
    mixed.current.stop();
    mastered.current.stop();
    clearInterval(playInterval.current);
    setPosition(0);
    setSliderPos(0);
  };

  const switchVersion = () => {
    stop();
    // if (trackNumber === 0) {
    original.current = original1;
    mixed.current = mixed1;
    mastered.current = mastered1;
    // } else if (trackNumber === 1) {
    //   original.current = original2;
    //   mixed.current = mixed2;
    //   mastered.current = mastered2;
    // } else {
    //   original.current = original3;
    //   mixed.current = mixed3;
    //   mastered.current = mastered3;
    // }
    const newDuration = mastered.current.duration();
    setDuration(newDuration);
    selectVersion();
    if (!paused) play(newDuration);
  };

  const play = (newDuration) => {
    if (mastered.current._state === "loaded") {
      original.current.play();
      mixed.current.play();
      mastered.current.play();
      setPaused(false);
      playInterval.current = setInterval(() => {
        const pos = original.current.seek();
        setPosition(pos);
        const dur = newDuration === null ? duration : newDuration;
        setSliderPos(() => (pos / dur) * 100);
      }, 1000);
    }
  };

  const pause = () => {
    if (mastered.current._state === "loaded") {
      original.current.pause();
      mixed.current.pause();
      mastered.current.pause();
      setPaused(true);
      clearInterval(playInterval.current);
    }
  };

  // eslint-disable-next-line
  const playNext = () => {
    if (mastered.current._state === "loaded") {
      setTrackNumber((prevTrackNumber) =>
        prevTrackNumber >= 2 ? 0 : prevTrackNumber + 1
      );
    }
  };

  // eslint-disable-next-line
  const playPrevious = () => {
    if (mastered.current._state === "loaded") {
      setTrackNumber((prevTrackNumber) =>
        prevTrackNumber <= 0 ? 2 : prevTrackNumber - 1
      );
    }
  };

  const selectVersion = () => {
    if (version === "ORIGINAL") {
      playOriginal();
    } else if (version === "MIXED") {
      playMix();
    } else {
      playMaster();
    }
  };

  const playOriginal = () => {
    if (mastered.current.volume() === 1) {
      mastered.current.fade(1, 0, 50);
    } else if (mixed.current.volume() === 1) {
      mixed.current.fade(1, 0, 50);
    } else {
      return;
    }
    original.current.fade(0, 1, 50);
    setBgColour(0);
  };

  const playMix = () => {
    if (original.current.volume() === 1) {
      original.current.fade(1, 0, 50);
    } else if (mastered.current.volume() === 1) {
      mastered.current.fade(1, 0, 50);
    } else {
      return;
    }
    mixed.current.fade(0, 1, 50);
    setBgColour(1);
  };

  const playMaster = () => {
    if (original.current.volume() === 1) {
      original.current.fade(1, 0, 50);
    } else if (mixed.current.volume() === 1) {
      mixed.current.fade(1, 0, 50);
    } else {
      return;
    }
    mastered.current.fade(0, 1, 50);
    setBgColour(2);
  };

  const handleSliderChange = (e, newValue) => {
    const newPos = duration * (newValue / 100);
    original.current.seek(newPos);
    mixed.current.seek(newPos);
    mastered.current.seek(newPos);
    setPosition(newPos);
    setSliderPos(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingBlock: "10vh",
        background: bgColours[bgColour],
      }}
      boxShadow={4}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          paddingBlockEnd={"5vh"}
          color={"white"}
        >
          Hear The Transformation
        </Typography>
        <Box>
          <Container maxWidth="sm">
            <Typography
              variant="h3"
              textAlign={"center"}
              paddingBlockStart={"2vh"}
              paddingBlockEnd={"2vh"}
              marginBlockEnd={"2vh"}
              color={"white"}
              sx={{
                textShadow: "2px 2px 2px #464646, 0 0 0.5em white",
              }}
              // textOverflow={false}
            >
              {version}
            </Typography>
            <Typography variant="body1" color={"white"}>
              {trackNames[trackNumber]}
            </Typography>

            <Slider
              size="small"
              aria-label="Volume"
              value={sliderPos}
              onChange={handleSliderChange}
              sx={{ color: "white" }}
            />
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              textAlign={"center"}
              spacing={2}
              direction="row"
              sx={{ marginBottom: 1, mt: -1 }}
            >
              <TinyText>{formatDuration(position)}</TinyText>
              <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Stack>

            <Box display={"flex"} justifyContent={"center"} mt={-2} mb={1}>
              {/* <IconButton aria-label="previous song" onClick={playPrevious}>
                <SkipPrevious fontSize="large" sx={{ color: "white" }} />
              </IconButton> */}
              <IconButton
                disabled={duration === 0}
                aria-label={paused ? "play" : "pause"}
                onClick={() => (paused ? play(null) : pause())}
              >
                {paused ? (
                  <PlayArrowRounded sx={{ fontSize: "3rem", color: "white" }} />
                ) : (
                  <PauseRounded sx={{ fontSize: "3rem", color: "white" }} />
                )}
              </IconButton>
              {/* <IconButton aria-label="next song" onClick={playNext}>
                <SkipNext fontSize="large" sx={{ color: "white" }} />
              </IconButton> */}
            </Box>
            <Typography
              display={"flex"}
              justifyContent={"center"}
              variant="h6"
              color={"white"}
            >
              Select version &#8659;
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"center"}
              sx={{ marginTop: 3 }}
            >
              <ToggleButtonGroup
                color="primary"
                value={version}
                exclusive
                onChange={(e, newVersion) => {
                  if (newVersion !== null) setVersion(newVersion);
                }}
                aria-label="Version"
              >
                <MuiToggleButton value="ORIGINAL" sx={{ color: "white" }}>
                  ORIGINAL
                </MuiToggleButton>
                <MuiToggleButton value="MIXED" sx={{ color: "white" }}>
                  MIXED
                </MuiToggleButton>
                <MuiToggleButton value="MASTERED" sx={{ color: "white" }}>
                  MASTERED
                </MuiToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
