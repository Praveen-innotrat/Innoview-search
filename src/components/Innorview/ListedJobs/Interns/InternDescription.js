import axios from "axios";
import React, { useEffect, useState } from "react";
import { HOSTED_API } from "../../../../Global";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatRupees } from "../../../../Utils";
import "./InternDescription.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";

function InternDescription() {
  const ViewJobId = localStorage.getItem("ViewJobId");

  // console.log(jobId, "response");
  const [descriptionData, setDescriptionData] = useState({});
  const [userData, setUserData] = useState({});
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${ViewJobId}/description`, {
        headers: {
          Role: "recruiter",
        },
      });
      console.log(response, "response"); // You can process or store the response data here

      if (response.status === 200 || response.status === 201) {
        setDescriptionData(response.data);
        fetchUserData(response.data.user_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  const handleApplyNow = (jobId) => {
    localStorage.setItem("jobId", jobId);
    nav("/innorview/schedule");
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="internship-details-page">
        <div className="header-section">
          <Button
            className="back-button"
            onClick={() => {
              nav(-1);
              localStorage.removeItem("ViewJobId");
            }}
          >
            Back to Internship
          </Button>
        </div>

        <div className="internship-details-container">
          <h1 className="internship-title">{descriptionData.intern_title}</h1>
          <a
            className="company-link"
            href={userData?.company_website}
            target="_blank"
            rel="noreferrer"
          >
            {userData?.company_name || "Company Name"}
          </a>
          <p className="internship-id">JOB ID: {descriptionData.job_id}</p>
          <p className="job-types">
            {descriptionData.intern_mode} | {descriptionData.intern_type}
          </p>
          <p className="apply-now-btn">
            <Button
              style={{
                width: "max-content",
              }}
              variant="outlined"
              onClick={() => handleApplyNow(descriptionData.job_id)}
            >
              APPLY NOW
            </Button>
          </p>
          <section className="internship-info">
            <div className="info-item">
              <h3>Location</h3>
              <LocationOnIcon />{" "}
              {descriptionData.location || userData.location || "Not Mentioned"}
            </div>
            <div className="info-item">
              <h3>Stipend (Per Annum)</h3>
              <p>{formatRupees(Number(descriptionData?.stipend))}</p>
            </div>
            <div className="info-item">
              <h3>Posted On</h3>
              <p>{descriptionData.created_at}</p>
            </div>
            <div className="info-item">
              <h3>No of Openings</h3>
              <p>{descriptionData.no_of_openings}</p>
            </div>
            <div className="info-item">
              <h3>Expected Start Date</h3>
              <p>{descriptionData.start_date}</p>
            </div>
            <div className="info-item">
              <h3>Deadline</h3>
              <p>{descriptionData.deadline}</p>
            </div>
            <div className="info-item">
              <h3>Benefits</h3>
              {descriptionData?.benefits?.split(",").map((data, index) => (
                <p key={index}>{data}</p>
              ))}
            </div>
          </section>

          <section className="internship-description">
            <h3>Intern Description</h3>
            <ul>
              {descriptionData.intern_responsibilities_text
                ? descriptionData.intern_responsibilities_text
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => <li key={index}>{item.trim()}.</li>)
                : "Description not available."}
            </ul>
          </section>
          <section className="internship-description">
            <h3>Intern Qualification</h3>
            <ul>
              {descriptionData.qualification
                ? descriptionData.qualification
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => <li key={index}>{item.trim()}.</li>)
                : "Qualification not available."}
            </ul>
          </section>
          <section className="internship-description">
            <h3>Intern Responsibilities</h3>
            <ul>
              {descriptionData.reponsibility
                ? descriptionData.reponsibility
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => <li key={index}>{item.trim()}.</li>)
                : "Responsibilities not available."}
            </ul>
          </section>
          <section className="internship-description">
            <h3>Intern Skills</h3>
            <div className="skills-info">{descriptionData?.skills}</div>
          </section>
        </div>
      </div>
    </>
  );
}

export default InternDescription;
