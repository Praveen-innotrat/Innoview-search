import React, { useEffect, useRef, useState } from "react";
import Header from "../../Header/Header";
import CircularProgress from "@mui/material/CircularProgress";
import "./Jobs.css";
import { Box, fontSize } from "@mui/system";
import { Typography } from "@mui/material";
import JobCard from "./JobCard";
import JobPageHeader from "./JobPageHeader";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultKey, setListedJob } from "../../../Store/JoblistingSlice";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import API_URLS from "../../../config";

const Jobs = () => {
  const [jobName, setJobName] = useState("");
  const [matchedKeywords, setMatchedKeywords] = useState([]); // State to hold matched keywords
  // console.log(matchedKeywords, "value");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null); // Initialize as null
  // let jobs = useSelector((state) => state.job.listedJobs);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  // console.log(jobs, "jobData");

  let keywords = [
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

  let key = useSelector((state) => state.job.defaultKey);
  // console.log(jobName, "value");

  const fetchJobData = async () => {
    setLoading(true); // At the start of fetchJobData
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel previous request
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const payload = { keyword: key.trim(), signal };
      const response = await axios.post(
        `${API_URLS.InnoviewResumeUrl}/get_internships`,
        payload,
        { signal }
      );

      if (response.data) {
        // console.log(response.data, "jobsdata");

        setJobs(response.data); // Update the jobs state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error:", error);
      }
      setLoading(false); // Ensure loading is false on error
    }
  };

  const handleInputChange = (value) => {
    setJobName(value);
    dispatch(setDefaultKey(value));
    setLoading(true);
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
    if (jobName.length == 0) {
      setMatchedKeywords([]);
      setLoading(false);
    }
  }, [jobName]);

  useEffect(() => {
    fetchJobData();
  }, [key]);

  return (
    <div className="jobs">
      <Header />
      <div className="jobs-container-tab">
        <>
          {/* <JobPageHeader /> */}
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
          <div className="result-page">Results found {jobs.length}</div>

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
              className="circular-progress"
              style={{
                display: loading ? "block" : "none",
              }}
            >
              <CircularProgress />
            </div>
            <div
              className="cancel-button"
              style={{
                display: jobName.length == 0 ? "block" : "none",
              }}
            >
              <CancelIcon
                style={{
                  display: jobName.length == 0 ? "none" : "block",
                }}
                onClick={() => handleCancelButton()}
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
              />
            </div>
          </div>
          {matchedKeywords.length !== 0 && (
            <div className="drop-down-parent">
              <ul className="dropdown-list">
                {matchedKeywords.map((keyword, index) => (
                  <li key={index} onClick={() => handleKeywordSelect(keyword)}>
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
                alignContent: "center",
              },
              gap: "2rem",
            }}
          >
            {jobs?.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </Box>
        </>
      </div>
    </div>
  );
};

export default Jobs;
