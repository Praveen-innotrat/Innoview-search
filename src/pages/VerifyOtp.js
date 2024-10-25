import React from "react";
import InnotratContainer from "../components/layout-components/Container";
import Navbar from "../components/layout-components/Navbar";
import Footer from "../components/layout-components/StickyFooter";
import VerifyOTP from "../components/auth/signup/verify-otp";

const VerifyOtp = () => {
  return (
    <React.Fragment>
      <Navbar />
      <InnotratContainer>
        <VerifyOTP />
      </InnotratContainer>
      <Footer />
    </React.Fragment>
  );
};

export default VerifyOtp;
