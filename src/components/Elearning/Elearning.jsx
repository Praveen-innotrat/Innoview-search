import React from "react";
import "./Elearning.css";

import elearning from "../../assets/elearning.png";
import Navbar from "../layout-components/Navbar";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Elearning = () => {
  return (
    <div className="elearning-container">
            {/* <Navbar /> */}
            <Header />
          <div className="elearning">

      <div className="elearning-content">
        <div className="elearning-content-left">
          <div className="elearning-content-left-top">
            <h1>
              IGNITE YOUR <br></br>LEARNING JOURNEY
            </h1>
            <div className="learning-content-left-top-div"></div>
          </div>
          <div className="elearning-content-left-btm">
            <div className="elearning-content-left-btm-top">
              <p className="elearning-content-left-btm-top-p">
                Empower your potential with our dynamic e-learning hub. Your
                path to success starts here – seize it!
              </p>
            </div>
            <div className="elearning-content-left-btm-btm">
              <button className="button-elearning">CERTIFICATE</button>

              <Link to="/programs">
                <button className="button-elearning">PROGRAMS</button>
              </Link>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <button className="elearning-3-btn">
                  Enterprise upskilling
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="elearning-content-right">
          <img src={elearning} alt="" />
        </div>
      </div>
    </div>

    {/* <></> */}
    </div>
  );
};

export default Elearning;
