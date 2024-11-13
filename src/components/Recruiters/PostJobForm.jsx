import React, { useState } from "react";
import JobForm from "./JobForm";
import InternshipForm from "./InternshipForm";
import "./Form.css";

function PostJobForm() {
  // State to track selected opportunity type (Job or Internship)
  const [opportunityType, setOpportunityType] = useState("job");

  // Handle opportunity type change (Job/Internship)
  const handleOpportunityTypeChange = (e) => {
    setOpportunityType(e.target.value);
  };

  return (
    <div className="post-job-tab">
      <div className="post-job-title">Post internship/job</div>
      <div className="post-for">
        <div className="post-form-title">Opportunity type</div>
        <div className="select-post-type">
          <div className="post-type-wrapper">
            {/* Radio buttons to choose between Internship and Job */}
            <div className="radio-post">
              <input
                type="radio"
                id="internship"
                name="opportunityType"
                value="internship"
                checked={opportunityType === "internship"}
                onChange={handleOpportunityTypeChange}
              />
              <label htmlFor="internship">Internship</label>
            </div>
            <div className="radio-post">
              <input
                type="radio"
                id="job"
                name="opportunityType"
                value="job"
                checked={opportunityType === "job"}
                onChange={handleOpportunityTypeChange}
              />
              <label htmlFor="job">Job</label>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render JobForm or InternshipForm based on the selected opportunity type */}
      <div>{opportunityType === "job" ? <JobForm /> : <InternshipForm />}</div>
    </div>
  );
}

export default PostJobForm;
