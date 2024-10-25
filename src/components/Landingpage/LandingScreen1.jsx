import React, { useEffect, useState } from "react";
import "./LandingScreen.css";
import Cookies from "js-cookie";
import HardWare from "../../assets/landingScreen/hardware.svg";
import { Link } from "react-router-dom";
import { chooseUsContent } from "../Constant/ConstantValue";
import BootstrapCard from "./Cards";
import Review from "./Review";

function LandingScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <>
      <div id="landing-screen-tab" className="parent-screen">
        <div id="screen-1" className="screen-1">
          <div className="image-section">
            <img className="image" src={HardWare} alt="image" />
          </div>
          <div className="section-1-content">
            <div className="section-1-moto">
              <span className="word word-1">Learn</span>
              <span className="word word-2">Grow</span>
              <span className="word word-3">Evolve</span>
            </div>
            <div className="section1-content">
              Empower Your Hardware Dreams with Innotrat Labs: Your Gateway to
              Cutting-edge IoT, Medical Electronics, and Automation Solutions
            </div>
            <Link to="eureka">
              <div className="scheldule-button">Schedule now</div>
            </Link>
          </div>
        </div>
        <div id="screen-2" className="screen-2">
          <div className="section-header">
            Why <b className="section-header-bolder">Choose Us?</b>
          </div>
          <div className="screen2-content-container">
            <div className="screen2-content">
              At Innotrat Labs, we believe that innovation should be accessible
              to all. Our commitment to affordability doesn't compromise the
              quality of our services. Experience excellence in hardware
              solutions without breaking the bank. we are 
            </div>
          </div>
          <div className="choose-us-cards-container">
            <div className="choose-us-cards-wrapper">
              {chooseUsContent.map((data, index) => {
                return <BootstrapCard key={index} data={data} />;
              })}
            </div>
          </div>
          <div className="reviews-container">
            <Review />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingScreen;
// {isLoggedIn ? (
//     <Link to="/dashboard">
//       <button className="text-lg bg-transparent text-[#091133] px-6 py-3 rounded-xl ml-4 border-2 border-solid border-[#091133] hover:scale-95 duration-500 ease-in-out font-semibold">
//         Get Started
//       </button>
//     </Link>
//   ) : (
//     <Link to="/eureka">
//       <button className="text-lg bg-transparent text-[#091133] px-6 py-3 rounded-xl ml-4 border-2 border-solid border-[#091133] hover:scale-95 duration-500 ease-in-out font-semibold">
//         Get Started
//       </button>
//     </Link>
//   )}
