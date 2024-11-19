import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // alignItems: "center",
  width: "300px",
  height: "250px",
  border:"2px solid #093311",
  padding:"20px",
  marginBottom:"20px",
  borderRadius:"15px",

}));

const Video = styled("video")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)",
  borderRadius: "1rem",
}));

function ResponseVideo(props) {
  const srcParts = props.src.split('/');
  // console.log(srcParts);
  // Exclude the first three parts of the split result and join the remaining parts
  const videoPath = `/${srcParts.slice(3).join('/')}`;
  // console.log(videoPath,"video");

  return (
    <React.Fragment>
      <Container>
        <p>Video Result(s)</p>
        <Video
          src={videoPath} // Use the extracted video path
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
        />
      </Container>
    </React.Fragment>
  );
}

export default ResponseVideo;
