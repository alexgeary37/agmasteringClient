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
  SkipPrevious,
  SkipNext,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { trackData, trackNames, numTracks } from "../../utilities/audioPlayer";

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

export const bgColours = [
  "linear-gradient(90deg, rgba(63,63,66,1) 0%, rgba(213,218,219,1) 100%)",
  "linear-gradient(90deg, rgba(32,32,96,1) 0%, rgba(104,185,194,1) 70%)",
  "linear-gradient(90deg, rgba(0,0,107,1) 0%, rgba(0,232,255,1) 70%)",
];

export default function AudioPlayer() {
  const [paused, setPaused] = useState(true);
  const [trackNumber, setTrackNumber] = useState(0);
  const [position, setPosition] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);
  const [duration, setDuration] = useState(0);
  const [version, setVersion] = useState("ORIGINAL");
  const [bgColour, setBgColour] = useState(0);

  const raw = useRef(null);
  const mix = useRef(null);
  const master = useRef(null);
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
    if (master.current._state === "loaded") {
      switchTrack();
    } // eslint-disable-next-line
  }, [trackNumber]);

  const loadAudioFiles = () => {
    raw.current = trackData.slowDown.raw;
    mix.current = trackData.slowDown.mix;
    master.current = trackData.slowDown.master;

    master.current.on("load", () => {
      setDuration(master.current.duration());
    });
  };

  const stop = () => {
    raw.current.stop();
    mix.current.stop();
    master.current.stop();
    clearInterval(playInterval.current);
    setPosition(0);
    setSliderPos(0);
  };

  const switchTrack = () => {
    stop();
    if (trackNumber === 0) {
      raw.current = trackData.slowDown.raw;
      mix.current = trackData.slowDown.mix;
      master.current = trackData.slowDown.master;
    } else if (trackNumber === 1) {
      raw.current = trackData.nearlyThere.raw;
      mix.current = trackData.nearlyThere.mix;
      master.current = trackData.nearlyThere.master;
    } else {
      raw.current = trackData.isItOver.raw;
      mix.current = trackData.isItOver.mix;
      master.current = trackData.isItOver.master;
    }
    const newDuration = master.current.duration();
    setDuration(newDuration);
    selectVersion();
    if (!paused) play(newDuration);
  };

  const selectVersion = () => {
    if (version === "ORIGINAL") {
      if (master.current.volume() === 1) master.current.fade(1, 0, 50);
      else if (mix.current.volume() === 1) mix.current.fade(1, 0, 50);
      else return;
      raw.current.fade(0, 1, 50);
      setBgColour(0);
    } else if (version === "MIXED") {
      if (raw.current.volume() === 1) raw.current.fade(1, 0, 50);
      else if (master.current.volume() === 1) master.current.fade(1, 0, 50);
      else return;
      mix.current.fade(0, 1, 50);
      setBgColour(1);
    } else {
      if (raw.current.volume() === 1) raw.current.fade(1, 0, 50);
      else if (mix.current.volume() === 1) mix.current.fade(1, 0, 50);
      else return;
      master.current.fade(0, 1, 50);
      setBgColour(2);
    }
  };

  const play = (newDuration) => {
    if (master.current._state === "loaded") {
      raw.current.play();
      mix.current.play();
      master.current.play();
      setPaused(false);
      playInterval.current = setInterval(() => {
        const pos = raw.current.seek();
        setPosition(pos);
        const dur = newDuration === null ? duration : newDuration;
        setSliderPos(() => (pos / dur) * 100);
      }, 1000);
    }
  };

  const pause = () => {
    if (master.current._state === "loaded") {
      raw.current.pause();
      mix.current.pause();
      master.current.pause();
      setPaused(true);
      clearInterval(playInterval.current);
    }
  };

  // eslint-disable-next-line
  const playNext = () => {
    if (master.current._state === "loaded") {
      setTrackNumber((prevTrackNumber) =>
        prevTrackNumber >= numTracks - 1 ? 0 : prevTrackNumber + 1
      );
    }
  };

  // eslint-disable-next-line
  const playPrevious = () => {
    if (master.current._state === "loaded") {
      setTrackNumber((prevTrackNumber) =>
        prevTrackNumber <= 0 ? numTracks - 1 : prevTrackNumber - 1
      );
    }
  };

  const handleSliderChange = (e, newValue) => {
    const newPos = duration * (newValue / 100);
    raw.current.seek(newPos);
    mix.current.seek(newPos);
    master.current.seek(newPos);
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
          Hear The Difference
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
              <IconButton aria-label="previous song" onClick={playPrevious}>
                <SkipPrevious fontSize="large" sx={{ color: "white" }} />
              </IconButton>
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
              <IconButton aria-label="next song" onClick={playNext}>
                <SkipNext fontSize="large" sx={{ color: "white" }} />
              </IconButton>
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
