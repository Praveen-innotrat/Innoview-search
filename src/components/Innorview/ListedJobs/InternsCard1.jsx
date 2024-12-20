import React from "react";
import "./InternCard1.css";
import { useNavigate } from "react-router";

function InternCard1({ companyData }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/innorview/schedule");
  };

  return (
    <div className="interncard-wrapper">
      <div className="company-header-wrapper">
        <div className="company-name">{companyData.company}</div>
        <div className="job-title">{companyData.title}</div>
      </div>
      <div className="details-wrapper">
        <div className="detail-item">
          <strong>Experience:</strong> {companyData.experience}
        </div>
        <div className="detail-item">
          <strong>Location:</strong> {companyData.location}
        </div>
        <div className="detail-item">
          <strong>Salary:</strong> {companyData.salary}
        </div>
      </div>
      {companyData.job_link && (
        <div className="job-link-wrapper">
          <a
            href={companyData.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="job-link"
          >
            View Job Listing
          </a>
        </div>
      )}
      <div
        style={{
          padding: "1rem 2rem",
          borderRadius: "10px",
          backgroundColor: "#4caf50",
          fontSize: "15px",
          textAlign: "center", // Center the text
          color: "white", // Set text color for better visibility
          cursor: "pointer", // Change cursor to pointer for better UX
          transition: "background-color 0.3s", // Smooth transition for hover
        }}
        onClick={() => handleNavigate()} ///interview-details
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#ffa726"; // Change background on hover
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4caf50"; // Revert background on mouse leave
        }}
      >
        Schedule Mock Interview
      </div>
    </div>
  );
}

export default InternCard1;
