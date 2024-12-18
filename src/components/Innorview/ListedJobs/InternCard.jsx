import React from "react";
import "./InternCard.css";

function InternCard({ companyData }) {
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
    </div>
  );
}

export default InternCard;
