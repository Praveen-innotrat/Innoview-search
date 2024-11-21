import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./jd.css";
import { HOSTED_API } from "../../../../Global";

function Jd() {
  const jobId = sessionStorage.getItem("jobId");
  const [descriptionData, setDescriptionData] = useState({});
  // console.log(descriptionData, "response");
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${jobId}/description`);
      // console.log(response, "response"); // You can process or store the response data here

      if (response.status === 200 || response.status === 201) {
        setDescriptionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApply = async () => {
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
      <div className="status2-detail-section">
        <div className="jd-header-section">
          <Button
            className="jd-buttons"
            onClick={() => {
              nav(-1);
            }}
          >
            Back to Jobs
          </Button>
        </div>
        <div className="status-list">
          <div className="status-one-details">Job ID</div>
          <div className="status-results">{descriptionData.job_id}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Job Location</div>
          <div className="status-results">Chennai</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Salary</div>
          <div className="status-results">{descriptionData.salary}</div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Job Description</div>
          <div className="status-results">
            {descriptionData.job_description_text}
          </div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Job Posted on</div>
          <div className="status-results">{descriptionData.created_at}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Notice Period</div>
          <div className="status-results">{descriptionData.notice_period}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">No of Openings</div>
          <div className="status-results">{descriptionData.no_of_openings}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Experience</div>
          <div className="status-results">
            {`${descriptionData.exp_min} - ${descriptionData.exp_max} of Experience`}
          </div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Current status</div>
          <Button
            className="jd-buttons"
            onClick={() => {
              handleApply();
            }}
          >
            APPLY NOW
          </Button>
        </div>
      </div>
    </>
  );
}

export default Jd;
