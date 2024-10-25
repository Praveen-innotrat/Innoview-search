import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // alignItems: "center",
  width: "300px",
  border:"2px solid #093311",
  padding:"20px",
  marginBottom:"20px",
  padding:"20px",
  marginBottom:"20px",
  borderRadius:"15px",



}));

const Audio = styled("audio")(({ theme }) => ({
  width: "90%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

function ResponseAudio(props) {
  return (
    <React.Fragment>
      <Container>
        <p>Audio Result(s)</p>
        <Audio
          controls
          controlsList="nodownload noplaybackrate"
          src={props.src}
          type="audio/mpeg"
        />
      </Container>
    </React.Fragment>
  );
}

export default ResponseAudio;
