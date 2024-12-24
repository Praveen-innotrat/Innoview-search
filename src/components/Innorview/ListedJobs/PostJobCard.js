import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Groups2Icon from "@mui/icons-material/Groups2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Postcard.css";
import { formatRupees } from "../../../Utils";
import axios from "axios";
import { INNO_API } from "../../../Global";
// import { formatRupees } from "../../../Global";

function PostJobCard({ userData, job }) {
  console.log(userData, job, "post");
  const navigate = useNavigate();
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  const handleViewClicks = (jobId) => {
    navigate("/jobs-description");
    sessionStorage.setItem("jobId", jobId);
  };

  const fetchAppliedCandidateData = async () => {
    const payload = { jobId: job?.job_id };

    try {
      const response = await axios.post(`${INNO_API}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`, // Add Bearer token to the Authorization header
        },
      });

      if (response.status === 200 || response.status === 201) {
        setAppliedCandidates(response.data);
        // setArray(response.data); // Assuming `response.data` is an array of objects
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAppliedCandidateData();
  }, []);

  return (
    <div className="post-card-wrapper">
      <div className="post-card-container">
        <div className="header-section">
          <div className="header-row">
            <div className="post-jobcard-title">
              {job.job_id}-{job.job_title || "Role"}
            </div>
            <div
              className="view-button"
              onClick={() => handleViewClicks(job.job_id)}
            >
              <VisibilityIcon />
              View
            </div>
          </div>
          <div className="post-company-name">
            <a
              href={userData?.company_website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData?.company_name || "Company Name"}
            </a>
          </div>
          <div className="post-job-location">
            <LocationOnIcon />
            {userData?.location || "Location"}
          </div>
        </div>

        <div className="body-section">
          <div className="post-job-description">
            {job.jd || "Job Description"}
          </div>
          <div className="post-job-deadline">
            {job.deadline || "Deadline: Tomorrow"}
          </div>
          <div className="footer-job-card-wrapper">
            <div className="job-type">{job.job_mode || "In Office"}</div>
            <div className="job-type">{job.job_type || "Full-Time"}</div>
            <div className="job-status job-type">{job.status || "Active"}</div>
          </div>
        </div>

        <div className="posted-by">Posted by : {userData?.name}</div>
        <div className="footer-job-card">
          <div className="salary">
            <CurrencyRupeeIcon />
            {formatRupees(job.salary) || 25000}
          </div>
          <div className="applicants-applied">
            <Groups2Icon />
            {appliedCandidates.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJobCard;
