import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import CircularProgress from "@mui/material/CircularProgress";
import "./Jobs.css";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import JobCard from "./JobCard";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultKey } from "../../../Store/JoblistingSlice";
import axios from "axios";
import API_URLS from "../../../config";
import { useNavigate } from "react-router";

const Jobs = () => {
  const [jobName, setJobName] = useState("iot");
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState("iot");
  const dispatch = useDispatch();
  const nav = useNavigate();

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

  const fetchJobData = async (value) => {
    setLoading(true);
    try {
      const payload = { keyword: value }; // Construct payload dynamically
      console.log("Sending payload:", payload); // Debug the payload
      const response = await axios.post(
        `${API_URLS.InnoviewResumeUrl}/get_internships`,
        payload
      );
      setJobs(response.data || []); // Handle response
    } catch (error) {
      console.error("Error fetching jobs:", error); // Log errors for debugging
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setJobName(value);
    dispatch(setDefaultKey(value));
    setMatchedKeywords(
      keywords.filter((keyword) =>
        keyword.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCancelButton = () => {
    setJobName("");
    setMatchedKeywords([]);
  };

  const handleKeywordSelect = (keyword) => {
    setJobName(keyword);
    dispatch(setDefaultKey(keyword));
    fetchJobData();
    setMatchedKeywords([]);
  };

  const handleCityChange = (value) => {
    setCity(value);
    fetchJobData(value);
  };

  useEffect(() => {
    if (jobName.length === 0) {
      setMatchedKeywords([]);
    }
  }, [jobName]);

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div className="jobs">
      <Header />
      <div className="jobs-container-tab">
        <Button
          sx={{
            width: "max-content",
          }}
          variant="contained"
          onClick={() => nav(-1)}
        >
          Back
        </Button>
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
          Featured <span style={{ color: "#3399ff" }}>Jobs</span>
        </Typography>

        <div className="city-buttons">
          {["All", ...keywords].map((cityName, index) => (
            <Button
              key={index}
              variant={city === cityName ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleCityChange(cityName)}
              sx={{ margin: "0.5rem", width: "max-content" }}
            >
              {cityName}
            </Button>
          ))}
        </div>

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
                value={jobName}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Search Jobs Here"
              />
              <div
                className="cancel-button"
                style={{ display: jobName.length ? "block" : "none" }}
              >
                <CancelIcon
                  onClick={handleCancelButton}
                  sx={{ fontSize: 24 }}
                />
              </div>
              <div className="search-button">
                <SearchIcon sx={{ fontSize: 24 }} onClick={fetchJobData} />
              </div>
            </div>

            {matchedKeywords.length > 0 && (
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
