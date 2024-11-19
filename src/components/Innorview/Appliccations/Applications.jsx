import React, { useEffect } from "react";
import Header from "../../Header/Header";
import "./Applications.css";
import Status from "../ScheduleInterview/Status";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

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
      "1": "Pending",
      "2": "Rejected",
      "3": "Rescheduled",
      "4": "Offer Under Process",
      "5": "Offer Released",
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
      "1": "Pending",
      "2": "Rejected",
      "3": "Rescheduled",
      "4": "Offer Under Process",
      "5": "Offer Released",
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
      "1": "Pending",
      "2": "Rejected",
      "3": "Rescheduled",
      "4": "Offer Under Process",
      "5": "Offer Released",
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
        <h1>Applications</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Interview ID</th>
                <th>Job ID</th>
                <th>Applied On</th>
                <th>Contact Details</th>
                <th>Interview Result</th>
                <th>Job Status</th>
                <th>Offer Status</th>
                <th>Download Offer Letter</th>    
                <th>My Response</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.interviewId}</td>
                  <td>{interview.jobId}</td>
                  <td>{interview.date}</td>
                  <td>{interview.token}</td>
                  <td onClick={handleStatus} style={{ cursor: "pointer" }}>
                    <span className="">
                      <FolderCopyIcon
                        sx={{
                          fontSize: 30,
                          color: "white",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </td>

                  {status && <Status close={handleClose} />}

                  <td style={{ cursor: "pointer" }}>{interview.status[4]}</td>

                  <td>{interview.OfferStatus[2]}</td>

                  <td onClick={handleStatus} style={{ cursor: "pointer" }}>
                  <span className="">
                    <FolderCopyIcon
                      sx={{
                        fontSize: 30,
                        color: "white",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </td>

                {/* {status && <Status close={handleClose} />} */}

                <td style={{ cursor: "pointer" }}>
                        {interview.myResponse}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
