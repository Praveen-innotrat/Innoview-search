import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Schedule.css";
import Cookies from "js-cookie";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Status from "./Status";
import schedule_interview_not_found from "../../../assets/schedule_interview_not_found.gif";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import API_URLS from "../../../config";

import "./InterviewDetails.css";

const InterviewDetails = ({ interviews, setInterviews }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [interviewData, setInterviewData] = useState([]);
  const [status, setStatus] = useState(false);
  const [link, setLink] = useState("");
  const [gen, setGen] = useState(false);

  const usertoken = Cookies.get("token");
  const headers = {
    headers: { authorization: `${usertoken}` },
  };

  useEffect(() => {
    const get = async () => {
      const response = await axios.get(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/schedule`,
        headers
      );
      console.log(response.data);
      setInterviewData(response.data);
    };
    get();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleStatus = () => {
    setStatus(!status);
  };

  const handleClose = () => {
    setStatus(false);
  };

  const linkGen = () => {
    // fetch("http://localhost:5000")
    // .then((data)=> data.json())
    // .then((link) => setLink(link))
    // .then(()=> setGen(true))
  };

  const savedNotes = ["asss", "ad", "aaa"];
  const chk = async () => {
    const data = {
      interviewId: "12",
      answers: savedNotes,
    };
    const response = await axios.post(
      `${API_URLS.InnoviewBaseUrl}/api/interview/answers`,
      data,
      headers
    );
    console.log(response.data);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      "https://app.dyte.io/v2/meeting?id=bbbdf12d-2606-4979-8a52-bd5eb79fa943"
    );
  };

  const admin = () => {
    navigate("/interview/admin");
  };

  console.log("checking interview", interviews);

  const handleJoinMeeting = async (id) => {
    try {
      console.log(id, "id");
      var interviewId =id
      localStorage.setItem("interviewId", id);
      const data = { data: interviewId };
      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/conflicts`,
        data,
        headers
      );

      console.log(response.data);
      // localStorage.setItem('InterviewMeetingId',id)

      if (response.data.success) {
        navigate(`/interview/${response.data.token}`);
      } else {
        toast.warning(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      toast.warning(
        error.response ? error.response.data.message : error.message
      );
    }
  };

 

  const isJoinButtonDisabled = (scheduledDate, scheduledTime, attended) => {
    const currentTime = moment();
    const interviewTime = moment(`${scheduledDate} ${scheduledTime}`, "YYYY-MM-DD HH:mm");
  
    // Disable the button if the current time is more than an hour after the scheduled time or if the interview has already been attended
    return currentTime.isAfter(interviewTime.add(1, "hours")) || attended;
  };
  

  return (
    <div className="interview-details">
      <Header />
      <div className="heading-container">
        <h1>Interview Details</h1>
        <Button
          variant="outlined"
          startIcon={<AddIcon fontSize="large" />}
          sx={{ maxWidth: "100px" }}
          onClick={() => navigate("/innorview/schedule")}
        >
          Create
        </Button>
      </div>

      <TableContainer className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Interview ID</TableCell>
              <TableCell>Job ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>HR Details</TableCell>
              <TableCell>Contact Details</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviewData.length > 0 ? (
              interviewData.map((interview, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{interview.scheduledDate}</TableCell>
                  <TableCell>{interview.scheduledTime}</TableCell>
                  <TableCell>Hr</TableCell>
                  <TableCell>{interview.mobile_number}</TableCell>
                  <TableCell
                    onClick={handleStatus}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="">
                      <FolderCopyIcon
                        sx={{
                          fontSize: 30,
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                        color="warning"
                      />
                    </span>
                  </TableCell>

                  {status && <Status close={handleClose} />}

                  <TableCell style={{ cursor: "pointer", color: "white" }}>
                    {interview.status === false ? (
                      <button disabled>Pending</button>
                    ) : (
                      <div className="button-join">
                        <Button
                          onClick={() => handleJoinMeeting(interview._id)}
                          disabled={isJoinButtonDisabled(
                            interview.scheduledDate,
                            interview.scheduledTime,
                            interview.attended
                          )}
                        >
                          Join Now
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div
                style={{
                  maxWidth: "100%",
                  height: "300px",
                  textAlign: "center",
                }}
              >
                <div>
                  <h2> No Data Found </h2>
                  <h4>
                    Do you want to take an interview?
                    <Link to="/innorview/schedule"> Click here </Link>
                  </h4>
                </div>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InterviewDetails;
