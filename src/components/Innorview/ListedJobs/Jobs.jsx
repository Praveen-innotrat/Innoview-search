import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import CircularProgress from "@mui/material/CircularProgress";
import "./Jobs.css";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import JobCard from "./JobCard";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultKey } from "../../../Store/JoblistingSlice";
import axios from "axios";
import API_URLS from "../../../config";

const Jobs = () => {
  const [jobName, setJobName] = useState("");
  const [matchedKeywords, setMatchedKeywords] = useState([]); // State to hold matched keywords
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  const keywords = [
    "iot",
    "mechatronics",
    "robotics",
    "embedded",
    "medical devices",
    "electrical engineering",
    "electronics",
    "electric vehicle",
    "biotechnology",
  ];

  const key = useSelector((state) => state.job.defaultKey);

  const fetchJobData = async () => {
    setLoading(true); // Set loading to true before fetching

    try {
      const payload = { keyword: key.trim() };
      const response = await axios.post(
        `${API_URLS.InnoviewResumeUrl}/get_internships`,
        payload
      );

      if (response.data) {
        setJobs(response.data); // Update the jobs state with fetched data
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); // Always set loading to false after the request
    }
  };

  const handleInputChange = (value) => {
    setJobName(value);
    dispatch(setDefaultKey(value));

    // Check for matches with the keywords array
    const matches = keywords.filter((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    );

    setMatchedKeywords(matches); // Update the state with matched keywords
  };

  const handleCancelButton = () => {
    setJobName("");
    setMatchedKeywords([]); // Clear matched keywords on cancel
  };

  const handleKeywordSelect = (keyword) => {
    setJobName(keyword); // Clear search bar after selection
    dispatch(setDefaultKey(keyword));
    fetchJobData();
    setMatchedKeywords([]); // Clear dropdown after selection
  };

  useEffect(() => {
    if (jobName.length === 0) {
      setMatchedKeywords([]);
    }
  }, [jobName]);

  useEffect(() => {
    fetchJobData(); // Initial data fetch
  }, []); // Dependency array ensures this runs only once

  return (
    <div className="jobs">
      <Header />
      <div className="jobs-container-tab">
        <Typography
          variant="h3"
          color="#18304B"
          textAlign="center"
          gutterBottom
          sx={{
            padding: "3rem",
            fontWeight: "bold",
          }}
        >
          Featured{" "}
          <span
            style={{
              color: "#3399ff",
            }}
          >
            Jobs
          </span>
        </Typography>

        {/* Show loading state */}
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
            <Typography variant="h6" color="textSecondary">
              Loading jobs, please wait...
            </Typography>
          </div>
        ) : (
          <>
            <div className="result-page">Results found: {jobs.length}</div>

            <div className="search-bar-container">
              <input
                className="search-input"
                type="text"
                name="search-jobs"
                value={jobName}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Search Jobs Here"
              />
              <div
                className="cancel-button"
                style={{
                  display: jobName.length !== 0 ? "block" : "none",
                }}
              >
                <CancelIcon
                  onClick={handleCancelButton}
                  sx={{
                    fontSize: 24,
                  }}
                />
              </div>
              <div className="search-button">
                <SearchIcon
                  sx={{
                    fontSize: 24,
                  }}
                  onClick={fetchJobData}
                />
              </div>
            </div>
            {matchedKeywords.length !== 0 && (
              <div className="drop-down-parent">
                <ul className="dropdown-list">
                  {matchedKeywords.map((keyword, index) => (
                    <li
                      key={index}
                      onClick={() => handleKeywordSelect(keyword)}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Box
              sx={{
                paddingX: "2rem",
                marginBottom: "4rem",
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: "2rem",
              }}
            >
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
