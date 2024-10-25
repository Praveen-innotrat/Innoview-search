import React from "react";
import InnotratContainer from "../components/layout-components/Container";
import Navbar from "../components/layout-components/Navbar";
import Footer from "../components/layout-components/StickyFooter";
import SignUpSide from "../components/auth/signup/SignUpSide";
import Header from "../components/Header/Header";

const Signup = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <Header/>
      <InnotratContainer>
        <SignUpSide />
      </InnotratContainer>
      <Footer />
    </React.Fragment>
  );
};

export default Signup;
