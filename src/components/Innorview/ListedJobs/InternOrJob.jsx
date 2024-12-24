import React from "react";
import "./Jobs.css";
import Intern from "./Assets/intern.svg";
import Job from "./Assets/job.svg";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function InternOrJob() {
  const nav = useNavigate();
  return (
    <>
      <div className="intern-or-job-wrapper">
        <div className="jobtypes-wrapper">
          <div
            className="type-card-wrapper"
            onClick={() => nav("/posted-internships")}
          >
            <img className="type-image" src={Intern} alt="Interns" />
            <div className="job-type-content">
              <div className="job-type-label">Internships</div>
            </div>
          </div>
          <div
            className="type-card-wrapper"
            onClick={() => nav("/posted-jobs")}
          >
            <img className="type-image" src={Job} alt="Jobs" />
            <div className="job-type-content">
              <div className="job-type-label">Jobs</div>
            </div>
          </div>
        </div>
      </div>
      <div className="back-btn-inn">
        <div className="back-button-wrapp" onClick={() => nav("/choose-type")}>
          <ArrowBackIosIcon /> BACK
        </div>
      </div>
    </>
  );
}

export default InternOrJob;
