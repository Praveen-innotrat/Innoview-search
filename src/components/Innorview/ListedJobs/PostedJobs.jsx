import React, { useEffect, useState } from "react";
import axios from "axios";
import PostJobCard from "./PostJobCard";
import SearchIcon from "@mui/icons-material/Search";
import noData from "./Assets/notfound.svg";
import "./Postcard.css";
import "./Recruiter.css";
import { Audio, BallTriangle, Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { HOSTED_API } from "../../../Global";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PostJobCardSkeleton from "../../SkeletonLoader/ForJobCard/PostJobCardSkeleton";

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
        let filterJobs = response.data.filter(
          (data) => data.approved_status == 1
        );
        const jobs = filterJobs.reverse();
        console.log(jobs, "Jobs");

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
    }, 2000); // 10000 milliseconds = 10 seconds

    return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
  }, []);

  // Real-time search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value.toUpperCase().trim();
    setSearchQuery(query);

    if (!query) {
      setFilteredJobs(jobData);
    } else {
      const filtered = jobData.filter((job) => job.job_id == query);
      setFilteredJobs(filtered);
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="posted-jobs-tab">
      <div className="button-wrapper">
        <div className="back-button-wrap" onClick={() => nav("/innorview")}>
          <ArrowBackIosIcon /> BACK
        </div>
      </div>
      <div className="jobs-search">
        <input
          type="text"
          className="jobpost-search"
          placeholder="Search by job role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
        <button
          style={{ width: "max-content" }}
          className="job-post-search-button"
          onClick={handleSearchChange}
        >
          <SearchIcon /> Search
        </button>
      </div>
      <div className="posted-job-container">
        {loading ? (
          Array(6) // Adjust the number for how many skeletons you want to show
            .fill(0)
            .map((_, index) => <PostJobCardSkeleton key={index} />)
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <PostJobCard key={job.id} jobData={job} />)
        ) : (
          <div className="no-data-found">
            <img className="no-data-found-imag" src={noData} alt="No Data" />
            <p>No Internships found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostedJobs;
