import React  from "react";
import '../components/CSS/Login.css';
import InnotratContainer from "../components/layout-components/Container";
import Navbar from "../components/layout-components/Navbar";
// import Footer from "../components/layout-components/Footer";
import Footer from "../components/Footer/Footer";
import SignInSide from "../components/auth/login/SignInSide";
import Header from "../components/Header/Header";

const Login = () => {

  return (
    <div className="login-container" >
      {/* <Navbar />  */}
      <Header/>
      <InnotratContainer>
      <SignInSide  />
      </InnotratContainer>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
