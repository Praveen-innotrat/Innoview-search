import React from "react";
import LoginsCard from "./LoginsCard";
import Recruiters from "../../assets/LoginScreens/recruiters.png";
import ForJobseekers from "../../assets/LoginScreens/jobseekers.png";
import "./LoginsCard.css";

function MainLogin() {
  const cardValue = [
    {
      title: "For Recruiters",
      subtitle: "hire job seekers",
      imag: Recruiters,
      nav: "/recruiters-login",
    },
    {
      title: "For JobSeekers",
      subtitle: "get upskilled and hired",
      imag: ForJobseekers,
      nav: "/eureka",
    },
  ];
  return (
    <>
      <div className="main-login-container">
        <div className="logins">
          {cardValue.map((data, index) => {
            return (
              <>
                <LoginsCard key={index} data={data} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainLogin;
