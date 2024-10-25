import React from "react";
import styled, { keyframes } from "styled-components";
import { styled as muiStyled } from "@mui/system";
import { Typography } from "@mui/material";
// import { dark } from "@mui/material/styles/createPalette";

const gradient = keyframes`
{
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}`;



const TextContainer = muiStyled("div")(({ theme }) => ({
  margin: "2rem 0rem 0rem 0rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  
  
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "0rem",
    margin: "5rem 0rem 2rem 0rem",
    
  },
  gap: "0.5rem",
  userSelect: "none",
}));

const HeadingText = muiStyled("h1")(({ theme }) => ({
  fontSize: "10rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
  top: 0,
  bottom: 0,
  margin: 0,
}));



const GradientTextOne = styled(HeadingText)`
  background: linear-gradient(90deg, #239e7c, #239e7c);
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1s linear infinite;

`;

const GradientTextTwo = styled(HeadingText)`
  background: linear-gradient(90deg, #f953c6, #b91d73);
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1s linear infinite;

`;
const GradientTextThree = styled(HeadingText)`
  background: linear-gradient(90deg, #ff4d4d, #f9cb28);
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 3s ease-in-out infinite;
`;

const DescriptionContainer = muiStyled("div")(({ theme }) => ({
  margin: "0rem 10rem 1rem 10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    margin: "0rem 0rem 2rem 0rem",
  },
}));

function BannerText() {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((currentIndex) =>
        currentIndex === 2 ? 0 : currentIndex + 1
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <TextContainer>
        <GradientTextOne>Learn.</GradientTextOne>
        <GradientTextTwo>Grow.</GradientTextTwo>
        <GradientTextThree>Evolve.</GradientTextThree>
      </TextContainer>
      {/* <TextContainer>
        {currentTextIndex === 0 ? (

          <GradientTextOne>Learn.</GradientTextOne>
        ) : (
          <HeadingText>Learn.</HeadingText>
        )}

        {currentTextIndex === 1 ? (
          <GradientTextTwo>Grow.</GradientTextTwo>
        ) : (
          <HeadingText>Grow.</HeadingText>
        )}

        {currentTextIndex === 2 ? (
          <GradientTextThree>Evolve.</GradientTextThree>
        ) : (
          <HeadingText>Evolve.</HeadingText>
        )}
      </TextContainer> */}
      <DescriptionContainer>
        <Typography
          component="p"
          variant="body1"
          align="center"
    
          style={{ fontSize: "2rem" }}
        >
         Go, Build A Product
        </Typography>
      </DescriptionContainer>
    </React.Fragment>
  );
}

export default BannerText;
