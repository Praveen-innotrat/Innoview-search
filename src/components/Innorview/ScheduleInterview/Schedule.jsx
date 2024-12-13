import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Cookies from "js-cookie";
import "./Schedule.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URLS from "../../../config";
import { Button } from "@mui/material";

const Schedule = ({ interviews, setInterviews }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [minDate, setMinDate] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let jobId = localStorage.getItem("jobId")?.trim() || "mock-interview";

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token");
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    validateForm();
  }, [selectedDate, selectedTime]);

  const validateForm = () => {
    let isValid = true;

    if (!selectedDate) {
      setDateError("Date is required");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!selectedTime) {
      setTimeError("Time is required");
      isValid = false;
    } else {
      setTimeError("");
    }

    if (!resumeFile) {
      setResumeError("Please upload your resume");
      isValid = false;
    } else {
      setResumeError("");
    }

    setIsFormValid(isValid);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleResumeFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const scheduleInterview = async () => {
    setFormSubmitted(true);
    validateForm();
    if (!selectedDate || !selectedTime || !resumeFile) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    const interviewData = {
      jobId: jobId,
      email: email,
      date: selectedDate,
      time: selectedTime,
      title: "Interview",
      name: "Interview with AI",
      picture:
        "https://media.licdn.com/dms/image/D4E0BAQHbnRl8btAggQ/company-logo_200_200/0/1687926042983?e=2147483647&v=beta&t=S2u-JuQJfSYOdpzzt1EnwnalStJ4Uu3cDRSmgCfW1y0",
      preset_name: "group_call_host",
    };

    try {
      const res = await fetch(
        "https://backend-test-gilt.vercel.app/interview/shedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interviewData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Error scheduling interview on the backend.");
      }

      const formData1 = new FormData();
      formData1.append("file", resumeFile);

      const resumePost = await axios.post(
        "https://api2.innotrat.in/api/resume",
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { token } = data.data;
      const mobile_number = Cookies.get("mobile_number");
      const usertoken = Cookies.get("token");
      const headers = {
        headers: { authorization: `${usertoken}` },
      };
      const postMeet = {
        jobId: jobId,
        email: email,
        date: selectedDate,
        time: selectedTime,
        token: token,
        mobile_number: mobile_number,
        question: resumePost.data["Skills-ques Map"],
      };

      const meetingpost = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/scheduled`,
        postMeet,
        headers
      );

      navigate(`/interview-details`);
      localStorage.clear();
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Error scheduling meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule">
      <Header />
      <div className="schedule-container">
        <ToastContainer />
        <div>
          {isLoggedIn ? (
            <div className="container-schedule-interview">
              <h4 style={{ textAlign: "center" }}>Interview Scheduler</h4>
              <div className="label-for-email">
                <label>Email(Optional)</label>
                <input
                  type="email"
                  className="email-input"
                  onChange={handleEmailChange}
                  style={{
                    border:
                      formSubmitted && emailError
                        ? "1px solid red"
                        : "1px solid gray",
                  }}
                />
                {formSubmitted && emailError && (
                  <span className="error-message">{emailError}</span>
                )}
              </div>
              <label>
                Select Date<span className="required">*</span>
                <input
                  type="date"
                  onChange={handleDateChange}
                  style={{
                    border:
                      formSubmitted && dateError
                        ? "1px solid red"
                        : "1px solid gray",
                  }}
                  min={minDate}
                  required
                />
                {formSubmitted && dateError && (
                  <span className="error-message">{dateError}</span>
                )}
              </label>
              <label>
                Select Time <span className="mandatory-symbol">*</span>
                <input
                  type="time"
                  onChange={handleTimeChange}
                  style={{
                    border:
                      formSubmitted && timeError
                        ? "1px solid red"
                        : "1px solid gray",
                  }}
                  required
                />
                {formSubmitted && timeError && (
                  <span className="error-message">{timeError}</span>
                )}
              </label>
              <label>
                Upload Resume<span className="mandatory-symbol">*</span>
                <input
                  type="file"
                  required
                  className="input-file-type"
                  onChange={handleResumeFileChange}
                  accept=".pdf, .doc, .docx"
                  style={{
                    border:
                      formSubmitted && resumeError
                        ? "1px solid red"
                        : "1px solid gray",
                  }}
                />
                {formSubmitted && resumeError && (
                  <span className="error-message">{resumeError}</span>
                )}
              </label>
              <div className="schedule-btn-section">
                {" "}
                <button
                  onClick={scheduleInterview}
                  disabled={loading || (formSubmitted && !isFormValid)}
                  className="schedule-button"
                  style={{
                    color: loading ? "white" : "",
                  }}
                >
                  {loading ? (
                    <>
                      {" "}
                      Scheduling Interview <CircularProgress size={24} />
                    </>
                  ) : (
                    "Schedule Interview"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p>Please log in to schedule an interview.</p>
          )}
        </div>
      </div>
      <div className="back-btn-inno">
        <Button sx={{ fontSize: "1.5rem" }} onClick={() => navigate(-1)}>
          BACK
        </Button>
      </div>
    </div>
  );
};

export default Schedule;
