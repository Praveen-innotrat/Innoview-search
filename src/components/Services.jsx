import React from "react";
import styled from "@emotion/styled";
import Card from "./services/card";
import HeroSection from "./layout-components/heroSection";
import Navbar from "./layout-components/Navbar";
import { CartState } from "./context/Context";
import Footer from "./layout-components/StickyFooter";


const Wrapper = styled.div`
  padding: 6rem 0;
  /* background-color: #fbfbfbeb; */

  .container1 {
    max-width: 100rem;
  }
  .common-heading {
    padding-top: 2rem;
  }
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 600;
  margin: 3rem;
`;



const Service = () => {
  // const isLoggedIn=true;
  const {
    state
  } = CartState();
  const{popularCourse}=state;
  // console.log("state",state);
  
  return (
    <>
    <Wrapper>
      <Navbar />
     {/* <Navbar isLoggedIn={isLoggedIn} /> */}
      <HeroSection />
      <Header className="common-heading" id="ourprogrammes"></Header>

      <div className="container1 grid grid-three-column">
        {popularCourse.map((item,i) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </Wrapper>
      {/* <></> */}
    </>
  );
};

export default Service;
