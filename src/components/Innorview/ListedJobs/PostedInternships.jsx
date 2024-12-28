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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PostJobCard from "./PostJobCard";
import PostJobCardSkeleton from "../../SkeletonLoader/ForJobCard/PostJobCardSkeleton";

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
          (data) => data.approved_status == 1
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
    }, 2000); // 10000 milliseconds = 10 seconds

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

export default PostedInterships;
