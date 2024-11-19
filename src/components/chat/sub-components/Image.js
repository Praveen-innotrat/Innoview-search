import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  border:"2px solid #093311",
  padding:"20px",
  marginBottom:"20px",
  borderRadius:"15px",
}));

function ResponseImage(props) {
  return (
    <React.Fragment>
      <Container>
        <img alt="response-img" src={props.src} />
      </Container>
    </React.Fragment>
  );
}

export default ResponseImage;
