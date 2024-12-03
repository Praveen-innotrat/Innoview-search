import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Schedule.css";
import Cookies from "js-cookie";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Status from "./Status";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import API_URLS from "../../../config";

import "./InterviewDetails.css";
import { formatPhoneNumber } from "../../../Utils";
import { fontSize } from "@mui/system";

const InterviewDetails = ({ interviews, setInterviews }) => {
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState([]);
  const [status, setStatus] = useState({ open: false, interviewId: null });
  const [array, setArray] = useState([]);

  const usertoken = Cookies.get("token");
  const headers = {
    headers: { authorization: `${usertoken}` },
  };

  console.log(status, "status");

  const getInterviews = async () => {
    try {
      const response = await axios.get(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/schedule`,
        headers
      );
      setInterviewData(response.data.reverse());
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  useEffect(() => {
    getInterviews();
  }, []);
  const handleStatus = (interviewId) => {
    setStatus({ open: !status.open, interviewId });
  };

  const handleClose = () => {
    setStatus({ open: false, interviewId: null });
  };

  const handleJoinMeeting = async (id) => {
    try {
      localStorage.setItem("interviewId", id);
      const data = { data: id };
      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/conflicts`,
        data,
        headers
      );

      if (response.data.success) {
        navigate(`/interview/${response.data.token}`);
        // navigate(`/mic-checking`);
      } else {
        toast.warning(response.data.message || "An error occurred");
      }
    } catch (error) {
      toast.warning(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const isJoinButtonDisabled = (scheduledDate, scheduledTime, attended) => {
    const currentTime = moment();
    const interviewTime = moment(
      `${scheduledDate} ${scheduledTime}`,
      "YYYY-MM-DD HH:mm"
    );

    // Disable the button if current time is more than an hour after scheduled time or if interview has been attended
    return currentTime.isAfter(interviewTime.add(1, "hours")) || attended;
  };

  return (
    <div className="interview-details">
      <Header />
      <div className="interview-header">
        <div className="interview-back-button">
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1.2rem",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#0073e6",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#005bb5",
              },
            }}
            onClick={() => navigate("/innorview")}
          >
            BACK
          </Button>
        </div>
        <h1 className="interview-title">Interview Details</h1>
        <Button
          variant="outlined"
          startIcon={<AddIcon fontSize="large" />}
          sx={{
            fontSize: "1rem",
            padding: "8px 16px",
            borderRadius: "8px",
            borderColor: "#0073e6",
            color: "#0073e6",
            width: "fit-content" /* Ensures button width fits the content */,
            "&:hover": {
              backgroundColor: "#f0f8ff",
              borderColor: "#005bb5",
            },
          }}
          onClick={() => navigate("/innorview/schedule")}
        >
          Create
        </Button>
      </div>

      <TableContainer
        className="table-container"
        sx={{
          borderRadius: "8px", // Optional rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow
          overflow: "scroll", // To handle border radius for scrollable tables
        }}
      >
        <Table
          sx={{
            backgroundColor: "#f9f9f9", // Light background color for the table
          }}
          aria-label="styled table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {" "}
              {/* Header background color */}
              {[
                "Interview ID",
                "Job ID",
                "Date",
                "Time",
                "HR Details",
                "Contact Details",
                "Result",
                "Status",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#fff", // White text color for header
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {interviewData.length > 0 ? (
              interviewData.map((interview, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f1f1", // Row hover effect
                      cursor: "pointer", // Pointer on hover
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {i + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {i + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {interview.scheduledDate}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {interview.scheduledTime}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    HR
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {formatPhoneNumber(interview.mobile_number)}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleStatus(interview._id)}
                  >
                    <FolderCopyIcon
                      sx={{ fontSize: 30, cursor: "pointer" }}
                      color="warning"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", textAlign: "center" }}>
                    {interview.status === false ? (
                      <button disabled>Pending</button>
                    ) : (
                      <Button
                        sx={{ fontSize: "14px" }}
                        onClick={() => handleJoinMeeting(interview._id)}
                        disabled={isJoinButtonDisabled(
                          interview.scheduledDate,
                          interview.scheduledTime,
                          interview.attended
                        )}
                      >
                        Join Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <div>
                    <h2>No Data Found</h2>
                    <h4>
                      Do you want to schedule an interview?{" "}
                      <Link to="/innorview/schedule">Click here</Link>
                    </h4>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Status Component - Only display when status is toggled */}
      {status.open && (
        <Status
          close={handleClose}
          open={status}
          Interview_id={status.interviewId}
        />
      )}
    </div>
  );
};

export default InterviewDetails;
