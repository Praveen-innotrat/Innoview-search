import React, { useEffect, useState } from "react";
import axios from "axios";
import PostJobCard from "./PostJobCard";
import SearchIcon from "@mui/icons-material/Search";
import noData from "./Assets/notfound.svg";
import "./Recruiter.css";
import { Audio, BallTriangle, Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { HOSTED_API } from "../../../Global";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function PostedJobs() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const nav = useNavigate();
  const fetchJobData = async () => {
    try {
      const response = await axios.get(`${HOSTED_API}/all_jobs`, {
        headers: {
          Role: "candidate",
        },
      });
      if (response.status === 200 || response.status === 201) {
        const jobs = response.data.reverse();

        // Fetch user data for each job
        const jobsWithUserData = await Promise.all(
          jobs.map(async (job) => {
            const payload = { user_id: job.user_id };
            try {
              const userResponse = await axios.post(
                `${HOSTED_API}/get_user_details`,
                payload,
                {
                  headers: {
                    Role: "candidate",
                  },
                }
              );
              if (userResponse.status === 200 || userResponse.status === 201) {
                return { ...job, userData: userResponse.data }; // Merge job and user data
              }
            } catch (userErr) {
              console.error(
                `Failed to fetch user data for job ${job.job_id}:`,
                userErr.message
              );
              return { ...job, userData: null }; // Handle case where user data fetch fails
            }
          })
        );
        setJobData(jobsWithUserData); // Set the job data with user details
        setFilteredJobs(jobsWithUserData); // Initialize filtered jobs with all jobs
        toast.success("Jobs fetched successfully");
      }
    } catch (err) {
      setError(err.message); // Set error message if the request fails
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobData(); // Call fetchJobData when the component mounts
    }, 1000); // 10000 milliseconds = 10 seconds

    return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
  }, []);
  const handleSearch = () => {
    const searchId = parseInt(searchQuery, 10); // Convert searchQuery to a number

    if (isNaN(searchId)) {
      setFilteredJobs(jobData); // If searchQuery is not a valid number, show all jobs
    } else {
      const filtered = jobData.filter((job) => job.job_id == searchId);
      setFilteredJobs(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-title">Fetching Jobs</div>
        <BallTriangle
          height="100%"
          width="100%"
          color="#007bff"
          radius={5}
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="posted-jobs-tab">
      <div className="button-wrapper">
        <Button
          sx={{
            fontSize: "16px",
          }}
          onClick={() => nav("/from-our-hiringpartners")}
        >
          <ArrowLeftIcon /> BACK
        </Button>
      </div>
      <div className="jobs-search">
        <input
          type="text"
          className="jobpost-search"
          placeholder="Search by job role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <button className="job-post-search-button" onClick={handleSearch}>
          <SearchIcon /> Search
        </button>
      </div>
      <div className="posted-job-container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <PostJobCard key={job.id} userData={job.userData} job={job} /> // Pass job details as props
          ))
        ) : (
          <div className="no-data-found">
            <img className="no-data-found-imag" src={noData} alt="No Data" />
            <p>No jobs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostedJobs;
