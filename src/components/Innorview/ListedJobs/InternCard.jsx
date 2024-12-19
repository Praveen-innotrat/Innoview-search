import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Groups2Icon from "@mui/icons-material/Groups2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { formatRupees } from "../../../Utils";

function InternsCard({ internship }) {
  console.log(internship, "internship");
  const navigate = useNavigate();
  const [checkStatus, setCheckStatus] = useState(false);

  const handleViewClicks = (jobId) => {
    navigate("/interns-description");
    localStorage.setItem("ViewInternId", jobId);
  };

  return (
    <>
      <div className="post-card-wrapper">
        <div className="post-card-container">
          <div className="header-section">
            <div className="header-row-1">
              <div className="post-jobcard-title">
                {internship.intern_title || "Role"}
              </div>
              <div
                className="view-button"
                onClick={() => handleViewClicks(internship.job_id)}
              >
                <VisibilityIcon />
                View
              </div>
            </div>
            <div
              style={{
                textTransform: "capitalize",
              }}
              className="post-company-name"
            >
              <a
                style={{
                  textDecoration: "none",
                }}
                href={internship?.userData?.company_website}
                target="blank"
              >
                {internship?.userData?.company_name || "Company Name"}
              </a>
            </div>
            <div
              style={{
                textTransform: "capitalize",
              }}
              className="post-job-location"
            >
              <LocationOnIcon /> {internship?.userData?.location || "Location"}
            </div>
          </div>

          <div className="body-section">
            <div
              onClick={() => handleViewClicks(internship.job_id)}
              className="post-job-description"
            >
              View Intern Description
            </div>
            {/* <div className="post-job-salary">{job.salary}</div> */}
            <div className="post-job-deadline">
              {/* {job.deadline || "Tomorrow"} */}
            </div>
            <div className="footer-job-card-wrapper">
              <div className="job-type">
                {internship.intern_mode || "In Office"}
              </div>
              <div className="job-type">
                {internship.intern_type || "Full-Time"}
              </div>
              <div className="job-status job-type">
                {internship.status || "Active"}
              </div>
            </div>

            {/* <div className="job-post-button-section">
              <div className="edit-jobpost-button">View</div>
              <div className="edit-jobpost-button">Edit</div>
              <div className="delete-jobpost-button">Delete</div>
            </div> */}
          </div>
          <div className="footer-job-wrapper">
            <div className="footer-job-card">
              <div className="salary">
                <CurrencyRupeeIcon />{" "}
                {formatRupees(internship?.stipend) || 25000}
              </div>
              <div className="applicants-applied">
                <Groups2Icon />
                55 applied
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InternsCard;
