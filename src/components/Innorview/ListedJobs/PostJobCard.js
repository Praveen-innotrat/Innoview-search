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
import { HOSTED_API, INNO_API } from "../../../Global";
// import { formatRupees } from "../../../Global";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-toastify";

function PostJobCard({ jobData }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [data, setData] = useState([]);
  const userId = jobData.user_id;
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  const handleViewClicks = (jobId, type) => {
    if (type == "internship") {
      navigate("/interns-description");
    } else {
      navigate("/jobs-description");
    }

    // dispatch(setJobCardViewId(jobId));
    localStorage.setItem("ViewJobId", jobId);
  };

  const jobId = localStorage.getItem("jobId");

  const fetchAppliedCandidateData = async () => {
    const payload = { jobId: jobData?.job_id };

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

  const handleShareClick = () => {
    const jobId = jobData?.job_id;
    const shareUrl = `${window.location.origin}/job-details/${jobId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Job link copied to clipboard!");
  };

  const fetchData = async () => {
    const payload = { jobId: jobId };

    try {
      const response = await axios.post(`${INNO_API}`, payload);

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        // setArray(response.data); // Assuming `response.data` is an array of objects
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      let payload = { user_id: userId };
      let response = await axios.post(
        `${HOSTED_API}/get_user_details`,
        payload,
        {
          headers: {
            Role: "recruiter",
          },
        }
      );
      console.log(response, "values");
      if (response.status === 200 || response.status === 201) {
        setUserData(response.data);
        // toast.success("User data fetched successfully");
      } else {
        toast.error("Somewhere facing issue... Please wait");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchAppliedCandidateData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="job-card-wrapper">
        <div className="job-card">
          <div className="job-card-header">
            <div className="header-row">
              <div
                className="job-title"
                title={jobData?.job_title || jobData?.intern_title}
              >
                {jobData.job_id} - {jobData.job_title || jobData.intern_title}
              </div>
              <div className="action-buttons">
                <button
                  className="view-button"
                  onClick={() =>
                    handleViewClicks(jobData.job_id, jobData.posting_type)
                  }
                >
                  <VisibilityIcon />
                </button>
                <button
                  style={{
                    display: jobData.approved_status == 1 ? "block" : "none",
                  }}
                  className="share-button"
                  onClick={handleShareClick}
                >
                  <ShareIcon />
                </button>
              </div>
            </div>
            <div className="company-info">
              <a
                className="company-link"
                href={userData?.company_website}
                target="_blank"
                rel="noreferrer"
              >
                {userData?.company_name || "Company Name"}
              </a>
              <div className="location">
                <LocationOnIcon />
                {jobData.location || userData?.location || "Location"}
              </div>
            </div>
          </div>
          <div className="job-card-body">
            <div
              className="job-description"
              onClick={() =>
                handleViewClicks(jobData.job_id, jobData.posting_type)
              }
            >
              View Job Description
            </div>
            <div className="posted-by">
              Posted by: {userData?.name}, {userId}
            </div>
            <div className="job-details">
              <div className="job-mode">
                {jobData.job_mode || jobData.intern_mode}
              </div>
              <div className="job-type">
                {jobData.job_type || jobData.intern_type}
              </div>
              <div className="job-status">{jobData.job_status}</div>
            </div>
          </div>
          <div className="job-card-footer">
            <div className="salary">
              <CurrencyRupeeIcon />{" "}
              {formatRupees(jobData.salary || jobData.stipend)}
            </div>
            <div className="applicants">
              <Groups2Icon />
              {appliedCandidates.length} Applicants
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJobCard;
