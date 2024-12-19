import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./jd.css";
import { HOSTED_API } from "../../../../Global";
import { formatRupees } from "../../../../Utils";

function Jd() {
  const jobId = sessionStorage.getItem("jobId");
  const [descriptionData, setDescriptionData] = useState({});
  // console.log(descriptionData, "response");
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${jobId}/description`, {
        headers: {
          Role: "candidate",
        },
      });
      // console.log(response, "response"); // You can process or store the response data here

      if (response.status === 200 || response.status === 201) {
        setDescriptionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApply = async () => {
    localStorage.setItem("jobId", descriptionData.job_id);
    // try {
    //   let response = await axios.get(`${HOSTED_API}/${jobId}/description`);
    //   if (response.status === 200 || response.status === 201) {
    //     setDescriptionData(response.data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    nav("/innorview/schedule");
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="job-details-container">
        <div className="job-header-section">
          <Button
            variant="contained"
            className="back-button"
            sx={{
              width: "fit-content",
            }}
            onClick={() => {
              nav(-1);
              localStorage.clear();
            }}
          >
            Back to Jobs
          </Button>
        </div>
        <div className="job-detail">
          <div className="detail-title">Job ID</div>
          <div className="detail-value">{descriptionData.job_id}</div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Job Location</div>
          <div className="detail-value">Chennai</div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Salary</div>
          <div className="detail-value">
            {formatRupees(descriptionData.salary)}
          </div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Job Description</div>
          <div className="detail-value">
            {descriptionData.job_description_text}
          </div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Job Posted on</div>
          <div className="detail-value">{descriptionData.created_at}</div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Notice Period</div>
          <div className="detail-value">{descriptionData.notice_period}</div>
        </div>
        <div className="job-detail">
          <div className="detail-title">No of Openings</div>
          <div className="detail-value">{descriptionData.no_of_openings}</div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Experience</div>
          <div className="detail-value">
            {`${descriptionData.exp_min} - ${descriptionData.exp_max} of Experience`}
          </div>
        </div>
        <div className="job-detail">
          <div className="detail-title">Current status</div>
          <div className="detail-value">None</div>
        </div>
        <Button
          className="apply-button"
          sx={{
            fontSize: "16px",
          }}
          onClick={() => {
            handleApply();
          }}
        >
          APPLY NOW
        </Button>
      </div>
    </>
  );
}

export default Jd;
