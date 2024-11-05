import React from "react";

function PostJobCard({ job }) {
  return (
    <>
      <div className="post-card-wrapper">
        <div className="post-card-container">
          <div className="header-section">
            <img className="post-card-image" src={job.img} alt="image" />
            <div className="post-company-name">{job.companyname}</div>
          </div>

          <div className="body-section">
            <div className="post-jobcard-title">{job.title}</div>
            <div className="post-job-description">{job.jd}</div>
            <div className="post-job-location">{job.location}</div>
            <div className="post-job-salary">{job.salary}</div>
            <div className="post-job-deadline">{job.deadline}</div>
            <div className="job-post-button-section">
              <div className="edit-jobpost-button">View</div>
              <div className="edit-jobpost-button">Edit</div>
              <div className="delete-jobpost-button">Delete</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJobCard;
