import axios from "axios";
import React, { useEffect, useState } from "react";
import { HOSTED_API } from "../../../../Global";
import { Button, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatRupees } from "../../../../Utils";
import "./jd.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";
import BackButton from "./BackButton/BackButton";

function Jd() {
  const ViewJobId = localStorage.getItem("ViewJobId");

  // console.log(jobId, "response");
  const [descriptionData, setDescriptionData] = useState({});
  const [userData, setUserData] = useState({});
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
        fetchUserData(response.data.user_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApplyNow = (jobId) => {
    localStorage.setItem("jobId", jobId);
    nav("/innorview/schedule");
  };

  const fetchUserData = async (userId) => {
    try {
      let payload = { user_id: userId };
      let response = await axios.post(
        `${HOSTED_API}/get_user_details`,
        payload,
        {
          headers: {
            Role: "recruiter",
          },
        }
      );
      console.log(response, "values");
      if (response.status === 200 || response.status === 201) {
        setUserData(response.data);
        // toast.success("User data fetched successfully");
      } else {
        toast.error("Somewhere facing issue... Please wait");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="job-details-page">
        <BackButton path={"/posted-jobs"} value={"to Jobs"} />
        <div className="job-details-container">
          <div className="header-row-description">
            <h1 className="job-title">
              {descriptionData.job_title || "Job Title"}
            </h1>
            <p className="apply-now-btn">
              <Button
                style={{
                  width: "max-content",
                  fontSize: 14,
                }}
                variant="contained"
                onClick={() => handleApplyNow(descriptionData.job_id)}
              >
                APPLY NOW
              </Button>
            </p>
          </div>
          <a
            className="company-link"
            href={userData?.company_website}
            target="_blank"
            rel="noreferrer"
          >
            {userData?.company_name || "Company Name"}
          </a>
          <p className="job-location">
            <LocationOnIcon />{" "}
            {descriptionData.location || userData.location || "Not Mentioned"}
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
            <div className="skills-info">{descriptionData.skills}</div>
          </div>
          <p className="apply-now-btn">
            <Button
              style={{
                width: "max-content",
                fontSize: 14,
              }}
              variant="contained"
              onClick={() => handleApplyNow(descriptionData.job_id)}
            >
              APPLY NOW
            </Button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Jd;
