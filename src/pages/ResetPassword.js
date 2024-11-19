import React from "react";
import InnotratContainer from "../components/layout-components/Container";
import Navbar from "../components/layout-components/Navbar";
import Footer from "../components/layout-components/StickyFooter";
import ResetSide from "../components/auth/reset-password/ResetSide";

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Navbar />
      <InnotratContainer>
        <ResetSide />
      </InnotratContainer>
      <Footer />
    </React.Fragment>
  );
};

export default ResetPassword;
