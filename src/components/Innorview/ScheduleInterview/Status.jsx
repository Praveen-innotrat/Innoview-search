import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import API_URLS from "../../../config";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Status = ({ close, Interview_id, open }) => {
  const location = useLocation();
  const [array, setArray] = useState([]);
  const [showTotalTable, setShowTotalTable] = useState(false);
  const navigate = useNavigate();

  const usertoken = Cookies.get("token");
  const headers = {
    headers: { authorization: `${usertoken}` },
  };

  const data = {
    interviewId: Interview_id,
  };

  useEffect(() => {
    const get = async () => {
      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/interview/getInterviewDetails`,
        data,
        headers
      );
      console.log(response, "response");

      setArray(response.data.Question);
    };
    get();
  }, [Interview_id]);

  // Calculate total score and counts based on the updated logic
  const calculateCounts = () => {
    let totalScore = 0;
    let wrongCount = 0;
    let aboveThirtyCount = 0; // New count for scores above 30

    array.forEach((d) => {
      const percentage = parseFloat(d["similarity_percentage"]);

      // Apply the updated logic
      if (percentage < 30) {
        totalScore += 0; // Add 0 points for percentage below 30
        wrongCount++;
      } else {
        totalScore += percentage; // Use the exact percentage as points for others
        aboveThirtyCount++; // Increment count for percentages above 30
      }
    });

    return { totalScore, wrongCount, aboveThirtyCount };
  };

  // Get the counts and total score
  const { totalScore, wrongCount, aboveThirtyCount } = calculateCounts();

  // Calculate the final score as a percentage of total possible points (100 * number of questions)
  const finalScore = (totalScore / (array.length * 100)) * 100;

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="md"
      fullWidth
      BackdropProps={{
        style: { backgroundColor: "transparent" }, // Fully transparent backdrop
      }}
      PaperProps={{
        style: {
          boxShadow: "none",
          borderRadius: 0,
          maxHeight: "55vh",
          overflow: "auto",
        }, // Add maxHeight and overflow for scroll
      }}
    >
      <DialogTitle style={{ fontSize: "2rem", textAlign: "center" }}>
        Status
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {!showTotalTable ? (
          <>
            <p style={{ fontSize: "1.5rem", padding: "40px 0px" }}>
              Number of questions: {array.length}
            </p>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "1.5rem",
                        backgroundColor: "#3f51b5", // Change to your desired color
                        color: "white", // White text for better contrast
                        textAlign: "center",
                      }}
                    >
                      S.no
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1.5rem",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Question
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1.5rem",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Mark in Percentage
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {array && array.length > 0 ? (
                    array.map((d, i) => (
                      <TableRow key={i}>
                        <TableCell
                          style={{ fontSize: "1.3rem", textAlign: "center" }}
                        >
                          {i + 1}
                        </TableCell>
                        <TableCell style={{ fontSize: "1.3rem" }}>
                          <div className="question-tab">
                            Q{i + 1} {d["question_text"]}
                          </div>
                          <div
                            className="question-tab"
                            style={{
                              color: "green",
                              textTransform: "capitalize",
                            }}
                          >
                            Ans : {d["answers"]}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", textAlign: "center" }}
                        >
                          {d["similarity_percentage"]}%
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        style={{
                          fontSize: "1.5rem",
                          textAlign: "center",
                          // fontStyle: "italic",
                          color: "gray",
                        }}
                      >
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <TableContainer>
              <p style={{ fontSize: "1.5rem" }}>
                Number of questions: {array.length}
              </p>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "1.5rem" }}>Metric</TableCell>
                    <TableCell style={{ fontSize: "1.5rem" }}>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: "1.3rem" }}>
                      Wrong Answers (less than 30%)
                    </TableCell>
                    <TableCell style={{ fontSize: "1.3rem" }}>
                      {wrongCount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "1.3rem" }}>
                      Answers above 30%
                    </TableCell>
                    <TableCell style={{ fontSize: "1.3rem" }}>
                      {aboveThirtyCount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                    >
                      Total Score
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                    >
                      {finalScore ? finalScore.toFixed(2) : 0}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        {!showTotalTable ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/profile")}
              style={{ fontSize: "1rem", margin: "0 8px" }}
            >
              View Updated Profile
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowTotalTable(true)}
              style={{ fontSize: "1rem", margin: "0 8px" }}
            >
              Total
            </Button>
            <Button
              variant="contained"
              onClick={close}
              style={{ fontSize: "1rem", margin: "0 8px" }}
            >
              Close
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className="m-4"
            onClick={() => setShowTotalTable(false)}
            style={{ marginBottom: "1rem", fontSize: "1rem", margin: "0 8px" }}
          >
            Back
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Status;
