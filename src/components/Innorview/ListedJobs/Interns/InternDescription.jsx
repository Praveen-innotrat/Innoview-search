import axios from "axios";
import React, { useEffect, useState } from "react";
import { HOSTED_API } from "../../../../Global";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatRupees } from "../../../../Utils";

function InternDescription() {
  const ViewJobId = localStorage.getItem("ViewInternId");
  const [approved, setApproved] = useState(false);
  const [descriptionData, setDescriptionData] = useState({});
  console.log(descriptionData, "response");
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${ViewJobId}/description`, {
        headers: {
          Role: "recruiter",
        },
      });
      console.log(response, "response"); // You can process or store the response data here

      if (response.status === 200 || response.status === 201) {
        setDescriptionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApply = async () => {
    localStorage.setItem("jobId", descriptionData.job_id);
    // try {
    //   let response = await axios.get(`${HOSTED_API}/${jobId}/description`);
    //   if (response.status === 200 || response.status === 201) {
    //     setDescriptionData(response.data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    nav("/innorview/schedule");
  };

  const getStatus = async () => {
    try {
      let response = await axios.get(`${HOSTED_API}/${ViewJobId}/status`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth-token") ||
            localStorage.getItem("x-access-token")
          }`,
        },
      });
      console.log(response.data, "response"); // Log the actual data from the response
      if (response.status == 200 || response.status == 201) {
        setApproved(true);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error Request:", error.request);
      } else {
        // Something else caused an error
        console.error("Error Message:", error.message);
      }
    }
  };

  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      <div className="status2-detail-section">
        <div className="jd-header-section">
          <Button
            sx={{
              fontSize: "16px",
            }}
            onClick={() => {
              nav(-1);
              localStorage.removeItem("ViewJobId");
            }}
          >
            Back to Internship
          </Button>
        </div>
        <div className="status-list">
          <div className="status-one-details">Internship Title</div>
          <div className="status-results">{descriptionData.intern_title}</div>
          <div className="status-one-details">Internship ID</div>
          <div className="status-results">{descriptionData.job_id}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Internship Location</div>
          <div className="status-results">Chennai</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Stipend (per Annum)</div>
          <div className="status-results">
            {formatRupees(Number(descriptionData?.stipend))}
          </div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Internship Description</div>
          <div className="status-results">
            <div>
              <ul>
                {descriptionData?.intern_responsibilities_text ? (
                  descriptionData?.intern_responsibilities_text
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => <li key={index}>{item.trim()}.</li>)
                ) : (
                  <li>No responsibilities provided.</li>
                )}

                {/* Display a fallback if data is missing */}
              </ul>
            </div>
          </div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Internship Posted on</div>
          <div className="status-results">{descriptionData.created_at}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">No of Openings</div>
          <div className="status-results">{descriptionData.no_of_openings}</div>
        </div>
        <div className="status-list">
          <div className="status-one-details">Expected start date</div>
          <div className="status-results">{descriptionData.start_date}</div>
        </div>

        <div className="status-list">
          <div className="status-one-details">Current status</div>
          <div
            className="status-results"
            style={{ color: approved ? "green" : "gold" }}
          >
            {descriptionData.status_type}
          </div>
        </div>
        <Button
          className="apply-button"
          sx={{
            fontSize: "16px",
          }}
          onClick={() => {
            handleApply();
          }}
        >
          APPLY NOW
        </Button>
      </div>
    </>
  );
}

export default InternDescription;
