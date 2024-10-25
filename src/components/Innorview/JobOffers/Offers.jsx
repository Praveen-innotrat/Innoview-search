import React from "react";
import Header from "../../Header/Header";
import "./Offers.css";
import { useNavigate } from "react-router";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

const offers = [
  {
    id: 1,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },

    myResponse: "Accepted",
  },
  {
    id: 2,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Rejected",
  },

  {
    id: 3,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Accepted",
  },

  {
    id: 4,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Rejected",
  },

  {
    id: 5,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Accepted",
  },

  {
    id: 6,
    interviewId: "4367687",
    OfferStatus: {},

    offerLetter: {
      status: true,
      file: "",
    },
    myResponse: "Rejected",
  },
];

const Offers = () => {
  const [status, setStatus] = React.useState(false);
  const navigate = useNavigate();
  const handleStatus = () => {
    setStatus(!status);
  };

  return (
    <div className="offers">
      <Header />
      <div className="offers-container">
        <h1>Job Offers</h1>
        <table style={{width:"70%"}}>
          <thead>
            <tr>
              <th>Interview ID</th>
              <th>Offer Status</th>
              <th>Download Offer Letter</th>
              <th>My Response</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((interview) => (
              <tr>
                <td>{interview.interviewId}</td>
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
  );
};

export default Offers;
