import React from "react";
import { styled } from "@mui/system";
import Circuit from  '../../assets/crct.png'

const Container = styled("div")(({ theme }) => ({

  // background: "#ececff",
  
  // backgroundImage:Circuit,
  backgroundSize: "cover", // Optional: Adjust the background size as needed
  backgroundRepeat: "no-repeat", // Optional: Adjust the background repeat as needed

  
  /* XXS breakpoint */
  [theme.breakpoints.down(theme.breakpoints.values.xs + 280)]: {
    padding: "2rem 0.5rem 2rem 0.5rem",
  
  },
  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1.5rem 2rem 1.5rem",
  },
  [theme.breakpoints.only("sm")]: {
    padding: "3rem 3rem 2rem 3rem",
  },
  [theme.breakpoints.only("md")]: {
    padding: "3rem 4rem 2rem 4rem",
  },
  [theme.breakpoints.only("lg")]: {
    padding: "3rem 4rem 2rem 4rem",
  },
  /* XLG breakpoint */
  [theme.breakpoints.up(theme.breakpoints.values.lg + 48)]: {
    padding: "3rem 5rem 2rem 5rem",
  },
  /* Full HD breakpoint */
  [theme.breakpoints.up("xl")]: {
    padding: "3rem 23rem 2rem 23rem",
  },
  /* XXL breakpoint */
  [theme.breakpoints.up(theme.breakpoints.values.xl + 640)]: {
    padding: "3rem 36rem 2rem 36rem",
  },
  /* XXXL breakpoint */
  [theme.breakpoints.up(theme.breakpoints.values.xl + 1920)]: {
    padding: "3rem 72rem 2rem 72rem",
  },
}));

const InnotratContainer = (props) => {
  return (
    <React.Fragment>
      <Container>{props.children}</Container>
    </React.Fragment>
  );
};

export default InnotratContainer;
