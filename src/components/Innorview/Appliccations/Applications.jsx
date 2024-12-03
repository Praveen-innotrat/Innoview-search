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
import { formatDate, formatPhoneNumber } from "../../../Utils";

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
    <div className="applications-page">
      <Header />
      <div className="applications-container">
        <div className="back-button-container">
          <Button
            variant="contained"
            sx={{ fontSize: "1.5rem", width: "fit-content" }}
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
        </div>
        <h1 className="applications-title">Applications</h1>
        <TableContainer
          component={Paper}
          className="applications-table-container"
        >
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableCell-root": {
                fontSize: "14px", // Set font size for all cells
                textAlign: "center", // Align text to center
              },
            }}
            aria-label="applications table"
          >
            <TableHead>
              <TableRow className="table-header-row">
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Interview ID
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Job ID
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Applied On
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Contact Details
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Interview Result
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Job Status
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Offer Status
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  Download Offer Letter
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="table-header-cell"
                >
                  My Response
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviews.map((interview) => (
                <TableRow key={interview.id} className="table-body-row">
                  <TableCell>{interview.interviewId}</TableCell>
                  <TableCell>{interview.jobId}</TableCell>
                  <TableCell>{formatDate(interview.date)}</TableCell>
                  <TableCell>{formatPhoneNumber(interview.token)}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleStatus} className="action-icon">
                      <FolderCopyIcon sx={{ fontSize: 30, color: "black" }} />
                    </IconButton>
                    {status && <Status close={handleClose} />}
                  </TableCell>
                  <TableCell className="status-cell">
                    {interview.status[4]}
                  </TableCell>
                  <TableCell>{interview.OfferStatus[2]}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleStatus} className="action-icon">
                      <FolderCopyIcon sx={{ fontSize: 30, color: "black" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell className="response-cell">
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
