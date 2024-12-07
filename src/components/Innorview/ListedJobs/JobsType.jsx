import React from "react";
import Online from "./Assets/online.svg";
import Hiring from "./Assets/hiring-partner.svg";
import "./Jobs.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

function JobsType() {
  const nav = useNavigate();
  return (
    <div className="jobs-container">
      <div className="job-cards-container">
        <div className="job-card" onClick={() => nav("/innorview/listedjob")}>
          <img className="job-card-image" src={Online} alt="Online Jobs" />
          <div className="job-card-content">
            <div className="job-card-title">From online sources</div>
          </div>
        </div>
        <div
          className="job-card"
          onClick={() => nav("/from-our-hiringpartners")}
        >
          <img className="job-card-image" src={Hiring} alt="Hiring Partners" />
          <div className="job-card-content">
            <div className="job-card-title">From our Hiring Partners</div>
          </div>
        </div>
      </div>
      <div className="back-button-container">
        <Button className="back-button" onClick={() => nav(-1)}>
          BACK
        </Button>
      </div>
    </div>
  );
}

export default JobsType;
