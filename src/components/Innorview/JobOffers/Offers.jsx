import React from "react";
import Header from "../../Header/Header";
import "./Offers.css";
import { useNavigate } from "react-router";
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
import PriceCard from "./PriceCard";

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
    <div className="offers-page">
      <Header />
      <div className="navigation-btn">
        <Button
          variant="contained"
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
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
      </div>
      <div className="offers-content">
        <h1 className="offers-title">Job Offers</h1>
        <TableContainer
          component={Paper}
          sx={{
            width: "70%",
            margin: "auto",
            marginTop: 4,
          }}
        >
          <Table
            sx={{
              "& .MuiTableCell-root": {
                fontSize: "14px",
              },
            }}
            aria-label="job offers table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#3f51b5",
                }}
              >
                {[
                  "Interview ID",
                  "Offer Status",
                  "Download Offer Letter",
                  "My Response",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((interview, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell align="center">{interview.interviewId}</TableCell>
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
                  <TableCell
                    align="center"
                    sx={{
                      cursor: "pointer",
                      color:
                        interview.myResponse === "Accepted" ? "green" : "red",
                    }}
                  >
                    {interview.myResponse}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="offers-price-card">
        <PriceCard />
      </div>
    </div>
  );
};

export default Offers;
