import React from "react";
import InnotratContainer from "../components/layout-components/Container";
import Navbar from "../components/layout-components/Navbar";
import Footer from "../components/layout-components/StickyFooter";
import VerifyResetOTP from "../components/auth/reset-password/VerifyReset";
const VerifyResetOtp = () => {
  return (
    <React.Fragment>
      <Navbar />
      <InnotratContainer>
        <VerifyResetOTP/>
      </InnotratContainer>
      <Footer />
    </React.Fragment>
  );
};

export default VerifyResetOtp;
