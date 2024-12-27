import axios from "axios";
import React, { useEffect, useState } from "react";
import { HOSTED_API } from "../../../../Global";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatRupees } from "../../../../Utils";
import "./jd.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Jd() {
  const ViewJobId = localStorage.getItem("ViewJobId");
  const [approved, setApproved] = useState(false);

  // console.log(jobId, "response");
  const [descriptionData, setDescriptionData] = useState({});
  console.log(descriptionData, "response");
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${ViewJobId}/description`, {
        headers: {
          Role: "recruiter",
        },
      });
      console.log(response, "api-response"); // You can process or store the response data here

      if (response.status === 200 || response.status === 201) {
        setDescriptionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatus = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${ViewJobId}/status`, {
        headers: {
          Role: "admin",
        },
      });
      console.log(response.data, "response"); // Log the actual data from the response
      if (response.status == 200 || response.status == 201) {
        // if (response.data.approved_status !== 0) {
        //   setApproved(true);
        // } else {
        //   setApproved(false);
        // }

        if (response.data.approved_status == 0) {
          setApproved(false);
        } else {
          setApproved(true);
        }
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error Request:", error.request);
      } else {
        // Something else caused an error
        console.error("Error Message:", error.message);
      }
    }
  };

  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="job-details-page">
        <div className="job-details-header">
          <Button
            onClick={() => {
              nav(-1);
              localStorage.removeItem("ViewJobId");
            }}
            className="back-button"
          >
            Back to Jobs
          </Button>
        </div>
        <div className="job-details-container">
          <h1 className="job-title">
            {descriptionData.job_title || "Job Title"}
          </h1>
          <p className="job-location">
            <LocationOnIcon /> {descriptionData.location || "Not Mentioned"}
          </p>
          <p className="job-types">
            {descriptionData.job_mode} | {descriptionData.job_type}
          </p>
          <p className="job-salary">
            Salary (per Annum): <b>Rs</b>{" "}
            {formatRupees(Number(descriptionData?.salary))}.
          </p>

          <div className="job-info-section">
            <div className="job-info">
              <h3>Job ID</h3>
              <p>{descriptionData.job_id}</p>
            </div>
            <div className="job-info">
              <h3>Notice Period</h3>
              <p>{descriptionData.notice_period}</p>
            </div>
            <div className="job-info">
              <h3>No of Openings</h3>
              <p>{descriptionData.no_of_openings}</p>
            </div>
            <div className="job-info">
              <h3>Posted On</h3>
              <p>{descriptionData.created_at}</p>
            </div>
            <div className="job-info">
              <h3 style={{ color: "red" }}>Deadline</h3>
              <p>{descriptionData.deadline || "Not Mentioned"}</p>
            </div>
            <div className="job-info">
              <h3>Experience</h3>
              <p>
                {descriptionData.exp_min} - {descriptionData.exp_max} Years
              </p>
            </div>
            {/* <div className="job-info">
              <h3>Status</h3>
              <p
                className={`job-status ${
                  approved ? "status-approved" : "status-pending"
                }`}
              >
                {approved ? "Approved" : "Pending"}
              </p>
            </div> */}
          </div>

          <div className="job-description-section">
            <h3>Job Description</h3>
            <ul>
              {descriptionData.job_description_text
                ? descriptionData.job_description_text
                    .split(".")
                    .filter((item) => item.trim() !== "") // Filter out empty strings
                    .map((item, index) => (
                      <li key={index}>{item.trim()}.</li> // Add the period back
                    ))
                : "Job description not available"}
            </ul>
          </div>
          <div className="job-description-section">
            <h3>Job Qualification</h3>
            <ul>
              {descriptionData.qualification
                ? descriptionData.qualification
                    .split(".")
                    .filter((item) => item.trim() !== "") // Filter out empty strings
                    .map((item, index) => (
                      <li key={index}>{item.trim()}.</li> // Add the period back
                    ))
                : "Job qualification not available"}
            </ul>
          </div>
          <div className="job-description-section">
            <h3>Responsibilities</h3>
            <ul>
              {descriptionData.reponsibility
                ? descriptionData.reponsibility
                    .split(".")
                    .filter((item) => item.trim() !== "") // Filter out empty strings
                    .map((item, index) => (
                      <li key={index}>{item.trim()}.</li> // Add the period back
                    ))
                : "Job reponsibility not available"}
            </ul>
          </div>
          <div className="job-description-section">
            <h3 className="skills-info">Skills</h3>
            <div>{descriptionData.skills}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jd;
