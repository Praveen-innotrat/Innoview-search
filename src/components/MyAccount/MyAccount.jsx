import { Box, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../Header/Header";
import "./MyAccount.css";
import Blank from "../../assets/landingScreen/blank.webp";
// import "../styles/UserAccountDetails.css";
const MyComponent = styled("div")({
  color: "#000000",

  padding: 8,
  borderRadius: 4,
  marginBottom: "1rem",
  backdropFilter: "blur(20px)",
  border: "1px solid #50719e",
});
const MyAccount = () => {
  return (
    <>
      <div className="myaccount-container-tab">
        <Header />
        <div className="all-wrappers">
          <div className="about-me-wrapper">
            <div className="my-account-title">About me</div>
            <div className="myaccount-body-content-wrapper">
              <div className="img-content-wrapper">
                <div className="myaccount-profile-img-wrapper">
                  <img src={Blank} className="myaccount-profile-img" alt="" />
                </div>
                <div className="myaccount-details">
                  <div className="welcome-note">HELLO, I"M</div>
                  <div className="myaccout-name">Praveenkumar Ramar</div>
                  <div className="myaccount-role">Full Stack Developer</div>
                  <div className="myaccount-location">Chennai</div>
                </div>
              </div>
              <div className="myaccount-description">
                <div className="welcome-note">Description about me</div>
              </div>
            </div>
          </div>
          <div className="acheivement-skill-wrapper ">
            <div className="my-account-title">Achievements and skills</div>
            <div className="cards-group">
              <div className="cards">
                <div className="profile-sub-title">Profile rating</div>
                <div className="profile-description">
                  Looking for job role/internship
                </div>
              </div>
              <div className="cards">
                <div className="cards-groups-1">
                  <div className="profile-groups">
                    <div className="profile-sub-title">Look at my works</div>
                    <a className="refer-link" href="#">
                      Word link
                    </a>
                  </div>
                  <div className="profile-groups">
                    <div className="profile-sub-title">
                      My market place(innomart)
                    </div>
                    <a className="refer-link" href="#">
                      Project sell link
                    </a>
                  </div>
                </div>
              </div>
              <div className="cards">
                <div className="profile-groups">
                  <div className="profile-sub-title">Languages</div>
                  <ul className="lists-group">
                    <li className="lists">English</li>
                    <li className="lists">Hindi</li>
                    <li className="lists">Tamil</li>
                  </ul>
                </div>
                <div className="profile-groups">
                  <div className="profile-sub-title">Soft skills</div>
                  <ul className="lists-group">
                    <li className="lists">Javascript</li>
                    <li className="lists">CSS</li>
                    <li className="lists">Javascript</li>
                    <li className="lists">HTML</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="edu-exp-wrapper"></div>
          <div className="skill-wrapper"></div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
