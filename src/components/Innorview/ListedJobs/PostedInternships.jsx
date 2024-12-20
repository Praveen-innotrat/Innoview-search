import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import noData from "./Assets/notfound.svg";
import { Audio, BallTriangle, Circles } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { HOSTED_API } from "../../../Global";
import InternsCard from "./InternCard";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function PostedInterships() {
  const [InternData, setInternData] = useState([]); // State to store job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const nav = useNavigate();
  const fetchJobData = async () => {
    try {
      const response = await axios.get(`${HOSTED_API}/all_internships`, {
        headers: {
          Role: "candidate",
        },
      });
      if (response.status === 200 || response.status === 201) {
        let filterJobs = response.data.filter(
          (data) => data.status_id !== "S1" && data.status_id !== "S2"
        );
        const interns = filterJobs.reverse();
        console.log(interns, "Jobs");

        // Fetch user data for each job
        const internsWithUserData = await Promise.all(
          interns.map(async (intern) => {
            const payload = { user_id: intern.user_id };
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
                return { ...intern, userData: userResponse.data }; // Merge job and user data
              }
            } catch (userErr) {
              console.error(
                `Failed to fetch user data for job ${intern.job_id}:`,
                userErr.message
              );
              return { ...intern, userData: null }; // Handle case where user data fetch fails
            }
          })
        );
        console.log(internsWithUserData, "response");
        setInternData(internsWithUserData); // Set the job data with user details
        setFilteredJobs(internsWithUserData); // Initialize filtered jobs with all jobs
        toast.success("Inters fetched successfully");
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

  // Real-time search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value.toUpperCase().trim();
    setSearchQuery(query);

    if (!query) {
      setFilteredJobs(InternData);
    } else {
      const filtered = InternData.filter((job) => job.job_id == query);
      setFilteredJobs(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredJobs(InternData);
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
    ); // Display loading message
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
          placeholder="Search by job ID or role..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            transition: "all 0.3s ease-in-out",
            boxShadow: searchQuery ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          }}
        />
        {searchQuery && (
          <button className="clear-search-button" onClick={clearSearch}>
            <CloseIcon />
          </button>
        )}
        <button
          className="job-post-search-button"
          onClick={() => handleSearchChange({ target: { value: searchQuery } })}
        >
          <SearchIcon />
        </button>
      </div>
      <div className="posted-job-container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((intern) => (
            <InternsCard key={intern.job_id} internship={intern} /> // Pass job details as props
          ))
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

export default PostedInterships;
