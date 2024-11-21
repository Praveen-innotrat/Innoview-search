import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

import Header from "../../Header/Header";
import "./Applications.css";
import Status from "../ScheduleInterview/Status";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const interviewData = [
  {
    interviewId: "4367687",
    jobId: 1,
    date: Date(),
    time: Date(),
    hrDetails: "HR",
    token: Cookies.get("mobile_number"),
    result: true,
    OfferStatus: {},
    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Accepted",
    status: {
      1: "Pending",
      2: "Rejected",
      3: "Rescheduled",
      4: "Offer Under Process",
      5: "Offer Released",
    },
  },
  {
    interviewId: "4367687",
    jobId: 2,
    date: Date(),
    time: Date(),
    hrDetails: "HR",
    token: Cookies.get("mobile_number"),
    result: true,
    OfferStatus: {},
    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Rejected",
    status: {
      1: "Pending",
      2: "Rejected",
      3: "Rescheduled",
      4: "Offer Under Process",
      5: "Offer Released",
    },
  },
  {
    interviewId: "4367687",
    jobId: 3,
    date: Date(),
    time: Date(),
    hrDetails: "HR",
    token: Cookies.get("mobile_number"),
    result: true,
    OfferStatus: {},
    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Accepted",
    status: {
      1: "Pending",
      2: "Rejected",
      3: "Rescheduled",
      4: "Offer Under Process",
      5: "Offer Released",
    },
  },
];

const Applications = () => {
  const [interviews, setInterviews] = React.useState(interviewData);

  const [status, setStatus] = React.useState(false);

  useEffect(() => {
    setInterviews(interviews);
  }, []);

  const handleStatus = () => {
    setStatus(!status);
  };
  const handleClose = () => {
    setStatus(false);
  };

  const navigate = useNavigate();

  return (
    <div className="application">
      <Header />
      <div className="application-container">
        <div className="back-btn-inno">
          <Button sx={{ fontSize: "1.5rem" }} onClick={() => navigate(-1)}>
            BACK
          </Button>
        </div>
        <h1>Applications</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableCell-root": {
                fontSize: "14px", // Set font size for all cells
              },
            }}
            aria-label="applications table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#3f51b5", // Set header background color
                }}
              >
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }} // Header font style
                >
                  Interview ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Job ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Applied On
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Contact Details
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Interview Result
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Job Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Offer Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Download Offer Letter
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  My Response
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell align="center">{interview.interviewId}</TableCell>
                  <TableCell align="center">{interview.jobId}</TableCell>
                  <TableCell align="center">{interview.date}</TableCell>
                  <TableCell align="center">{interview.token}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={handleStatus}>
                      <FolderCopyIcon
                        sx={{
                          fontSize: 30,
                          color: "black",
                        }}
                      />
                    </IconButton>
                    {status && <Status close={handleClose} />}
                  </TableCell>
                  <TableCell align="center" style={{ cursor: "pointer" }}>
                    {interview.status[4]}
                  </TableCell>
                  <TableCell align="center">
                    {interview.OfferStatus[2]}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={handleStatus}>
                      <FolderCopyIcon
                        sx={{
                          fontSize: 30,
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" style={{ cursor: "pointer" }}>
                    {interview.myResponse}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Applications;
