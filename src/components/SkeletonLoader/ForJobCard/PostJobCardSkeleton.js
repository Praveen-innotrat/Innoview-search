import React from "react";
import "./PostJobCardSkeleton.css";

function PostJobCardSkeleton() {
  return (
    <>
      <div className="job-card-wrapper skeleton-loader">
        <div className="job-card">
          <div className="job-card-header">
            <div className="header-row">
              <div className="skeleton skeleton-title"></div>
              <div className="action-buttons">
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-icon"></div>
              </div>
            </div>
            <div className="company-info">
              <div className="skeleton skeleton-link"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
          <div className="job-card-body">
            <div className="job-description">
              <div className="skeleton skeleton-button"></div>
            </div>
            <div className="posted-by">
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="job-details">
              <div className="skeleton skeleton-chip"></div>
              <div className="skeleton skeleton-chip"></div>
              <div className="skeleton skeleton-chip"></div>
            </div>
          </div>
          <div className="job-card-footer">
            <div className="salary">
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="applicants">
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJobCardSkeleton;
