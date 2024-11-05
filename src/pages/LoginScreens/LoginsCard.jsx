import React from "react";
import "./LoginsCard.css";
import { useNavigate } from "react-router";

function LoginsCard({ data }) {
  const navigate = useNavigate();

  const handleNavigate = (nav) => {
    navigate(nav);
  };

  return (
    <>
      <div
        className="login-card-wrapper"
        onClick={() => {
          handleNavigate(data.nav);
        }}
      >
        <div className="login-card-container">
          <div className="login-card-image-container">
            <img className="login-image" src={data.imag} alt="recruiters" />
          </div>
          <div className="login-body-container">
            <div className="title-for">{data.title}</div>
            <h5 className="subtitle-for">{data.subtitle}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginsCard;
