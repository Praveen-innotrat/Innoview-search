import React, { useState } from "react";

// https://api1.innotrat.in/api/meetings/scheduled
const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    date: "",
    time: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can handle the form data here, e.g., sending it to a backend or performing other actions
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {/* Optional Email Field */}
      <div className="form-component">
        <label className="schedule-form">Email (Optional):</label>
        <input
          className="schedule-form-inputs"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email (optional)"
        />
      </div>

      {/* Date Field */}
      <div className="form-component">
        <label className="schedule-form">Date:</label>
        <input
          className="schedule-form-inputs"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Time Field */}
      <div className="form-component">
        <label className="schedule-form">Time: </label>
        <input
          className="schedule-form-inputs"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      {/* Resume File Upload */}
      <div className="form-component">
        <label className="schedule-form">Upload Resume:</label>
        {/* <br /> */}
        <input
          className="schedule-form-inputs"
          type="file"
          name="resume"
          accept=".pdf, .doc, .docx"
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <button className="schedule-submit-form-btn" type="submit">
        Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
