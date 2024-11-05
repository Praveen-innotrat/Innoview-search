import React, { useEffect, useState } from "react";
import axios from "axios";
import PostJobCard from "./PostJobCard";
import SearchIcon from "@mui/icons-material/Search";

function PostedJobs() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  const fetchJobData = async () => {
    try {
      const response = await axios.get(
        "https://6729a2686d5fa4901b6dc13b.mockapi.io/innoview-recruiter/total-details"
      );
      setJobData(response.data); // Set the fetched job data
      setFilteredJobs(response.data); // Initialize filtered jobs with all jobs
    } catch (err) {
      setError(err.message); // Set error message if the request fails
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchJobData(); // Call fetchJobData when the component mounts
  }, []);

  const handleSearch = () => {
    const searchId = parseInt(searchQuery, 10); // Convert searchQuery to a number

    if (isNaN(searchId)) {
      setFilteredJobs(jobData); // If searchQuery is not a valid number, show all jobs
    } else {
      const filtered = jobData.filter((job) => job.id == searchId);
      setFilteredJobs(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message
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
            <PostJobCard key={job.id} job={job} /> // Pass job details as props
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default PostedJobs;
