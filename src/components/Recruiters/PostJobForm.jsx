import React, { useState } from "react";

function PostJobForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: "",
    companyLocation: "",
    jobRole: "",
    experience: "",
    jobDescription: "",
    jobType: "",
    salary: "",
    deadline: "", // Add deadline state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Here you can add the logic to send formData to your backend or API
  };
  return (
    <>
      <div className="post-job-tab">
        <form onSubmit={handleSubmit} className="post-job-form">
          <div className="post-job-title">Post a Job</div>

          <div className="input-wrapper">
            <div className="section-1">
              <div className="input-section">
                <label className="postjoblabel">Company Name:</label>
                <input
                  className="postjobinput"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="input-section">
                <label className="postjoblabel">Company Location:</label>
                <input
                  className="postjobinput"
                  type="text"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="input-section">
                <label className="postjoblabel">Experience (Years):</label>
                <select
                  className="postjobinput"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={{ fontSize: "14px" }} // Set font size here
                  required
                >
                  <option value="">Select</option>
                  <option value="fresher">Fresher</option>
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-section" style={{ fontSize: "14px" }}>
                <label className="postjoblabel">Job Type:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="part-time"
                      onChange={handleChange}
                      required
                    />
                    Part-Time
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="full-time"
                      onChange={handleChange}
                      required
                    />
                    Full-Time
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="remote"
                      onChange={handleChange}
                      required
                    />
                    Remote
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="hybrid"
                      onChange={handleChange}
                      required
                    />
                    Hybrid
                  </label>
                </div>
              </div>
              <div className="input-section">
                <label className="postjoblabel">Deadline:</label>
                <input
                  className="postjobdate"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="section-2">
              <div className="input-section">
                <label className="postjoblabel">Company Logo URL:</label>
                <input
                  className="postjobinput"
                  type="text"
                  name="companyLogo"
                  value={formData.companyLogo}
                  onChange={handleChange}
                  placeholder="Enter logo URL"
                  required
                />
              </div>

              <div className="input-section">
                <label className="postjoblabel">Job Role:</label>
                <input
                  className="postjobinput"
                  type="text"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  placeholder="Enter job role"
                  required
                />
              </div>
              <div className="input-section">
                <label className="postjoblabel">Job Description:</label>
                <textarea
                  className="postjobTextarea"
                  name="jobDescription"
                  rows={6}
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  required
                />
              </div>
              <div className="input-section">
                <label className="postjoblabel">Salary:</label>
                <input
                  className="postjobinput"
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                  required
                />
              </div>
            </div>
          </div>
          <div className="post-submit-btn-section">
            <button className="post-submit-button" type="submit">
              Submit Job Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostJobForm;
