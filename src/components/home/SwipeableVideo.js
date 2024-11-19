import React from "react";
import { useSwipeable } from "react-swipeable";
import { styled } from "@mui/system";
import { Fab } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const VideoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
}));

const Video = styled("video")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
  height: "50%",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)",
  borderRadius: "1rem",
}));

const VideoDescription = styled("h2")(({ theme }) => ({
  textAlign: "center",
}));

function SwipeableVideo() {
  const videoRef = React.useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);

  const videos = [
    {
      url: "/videos/home/intro.mp4",
      title: "Introducing EUREKA, conversational copilot for embedded products building",
    },
    {
      url: "/videos/home/HardwareManufacturing.mp4",
      title: "End to end virtual assistant for helping you embedded hardware design, build printed circuit boards, and manufacture electronics products",
    },
    {
      url: "/videos/home/HiringStaffing.mp4",
      title: "Imparting embedded systems design training towards hardware development, skill to uplift an engineer in core industry, providing interview and placement assistance via connecting with ecosytem partners",
    },
  ];

  const handleSwipe = (delta) => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex + delta;
      if (newIndex < 0) {
        return videos.length - 1;
      } else if (newIndex >= videos.length) {
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  React.useEffect(() => {
    videoRef.current.load();
  }, [currentVideoIndex]);

  return (
    <div {...handlers}>
      <VideoContainer>
        <Fab
          size="small"
          //   color="secondary"
          aria-label="previous"
          onClick={() => handleSwipe(-1)}
        >
          <KeyboardArrowLeftIcon />
        </Fab>
        <Video ref={videoRef} src={videos[currentVideoIndex].url} controls />
        <Fab
          size="small"
          //   color="secondary"
          aria-label="next"
          onClick={() => handleSwipe(1)}
        >
          <KeyboardArrowRightIcon />
        </Fab>
      </VideoContainer>
      <VideoDescription style={{marginTop:"20px"}}>{videos[currentVideoIndex].title}</VideoDescription>
    </div>
  );
}

export default SwipeableVideo;
