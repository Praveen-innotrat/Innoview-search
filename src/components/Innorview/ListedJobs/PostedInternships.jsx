import React, { useEffect, useState } from "react";
import axios from "axios";
import PostJobCard from "./PostJobCard";
import SearchIcon from "@mui/icons-material/Search";
import noData from "./Assets/notfound.svg";
import "./Recruiter.css";
import { Audio, BallTriangle, Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { HOSTED_API } from "../../../Global";

function PostedJobs() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [userData, setUserData] = useState([]);
  const userId = sessionStorage.getItem("user_id");

  const fetchJobData = async () => {
    try {
      const response = await axios.get(`${HOSTED_API}/all_internships`, {
        headers: {
          Role: "candidate",
        },
      });
      console.log(response, "response");
      if (response.status === 200 || response.status == 201) {
        setJobData(response.data); // Set the fetched job data
        setFilteredJobs(response.data); // Initialize filtered jobs with all jobs
        toast.success("Jobs Fetched Successfully");
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
        <div className="loading-title">Fetching Internships</div>
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
            <PostJobCard key={job.id} userData={userData} job={job} /> // Pass job details as props
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
