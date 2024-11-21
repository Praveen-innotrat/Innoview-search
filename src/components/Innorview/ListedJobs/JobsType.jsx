import React from "react";
import Online from "./Assets/online.svg";
import Hiring from "./Assets/hiring-partner.svg";
import "./Jobs.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
function JobsType() {
  const nav = useNavigate();
  return (
    <>
      <div className="jobtypes-wrapper">
        <div
          className="type-card-wrapper"
          onClick={() => nav("/innorview/listedjob")}
        >
          <img className="type-image" src={Online} alt="Online-jobs" />
          <div className="job-type-content">
            <div className="job-type-label">From online sources</div>
          </div>
        </div>
        <div
          className="type-card-wrapper"
          onClick={() => nav("/from-our-hiringpartners")}
        >
          <img className="type-image" src={Hiring} alt="Online-jobs" />
          <div className="job-type-content">
            <div className="job-type-label">From our Hiring Partners</div>
          </div>
        </div>
      </div>
      <div className="back-btn-inno">
        <Button sx={{ fontSize: "1.5rem" }} onClick={() => nav(-1)}>
          BACK
        </Button>
      </div>
    </>
  );
}

export default JobsType;
