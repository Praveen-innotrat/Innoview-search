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
    <div className="offers">
      <Header />
      <div className="back-btn-inno">
        <Button sx={{ fontSize: "1.5rem" }} onClick={() => navigate(-1)}>
          BACK
        </Button>
      </div>
      <div className="offers-container">
        <h1>Job Offers</h1>
        <TableContainer
          component={Paper}
          sx={{
            width: "70%",
            margin: "auto", // Centers the table
            mt: 4, // Adds margin at the top
          }}
        >
          <Table
            sx={{
              "& .MuiTableCell-root": {
                fontSize: "14px", // Font size for all cells
              },
            }}
            aria-label="job offers table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#3f51b5", // Header background color
                }}
              >
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                >
                  Interview ID
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
              {offers.map((interview, index) => (
                <TableRow key={index}>
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
      <div className="price-card">
        <PriceCard />
      </div>
    </div>
  );
};

export default Offers;
