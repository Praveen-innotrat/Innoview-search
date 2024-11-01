import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
} from "@mui/material";
import "./Jobs.css";
import PlaceIcon from "@mui/icons-material/Place";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { fontSize } from "@mui/system";

const JobCard = ({
  jobId,
  company,
  jobTitle,
  jobDescription,
  jobLocation,
  // jobType,
  jobData,
  jobSalary,
  // jobSkills,
  // jobExperience,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = () => {
    navigate("/innorview/schedule");
  };

  return (
    <>
      <Card
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "400px",
          height: "auto", // Let the card grow based on content
          border: "1px solid transparent",
          display: "flex", // Use flexbox for layout
          flexDirection: "column", // Stack content vertically
          transition: "border-color 0.3s ease",
          background: "transparent",

          "&:hover": {
            borderColor: "#034aac",
          },
        }}
        elevation={3}
      >
        <CardContent
          sx={{
            flex: "1", // Allow CardContent to take up available space
          }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{
              color: "#0a2540",
            }}
            component="h2"
            gutterBottom
          >
            {company}
          </Typography>
          <Typography
            textAlign={"center"}
            variant="h5"
            sx={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            {jobTitle}
          </Typography>

          <Typography
            variant="h6"
            textAlign={"center"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingY: "1rem",
              color: "#0464c5",
            }}
          >
            <PlaceIcon />
            {jobLocation}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "auto", // Push button to the bottom
            paddingY: "1rem",
          }}
        >
          <div className="button-section">
            <div
              style={{
                padding: "1rem 2rem",
                borderRadius: "10px",
                fontSize: "13px",
                backgroundColor: "#034aac",
                color: "white", // Set text color for better visibility
                textAlign: "center", // Center the text
                cursor: "pointer", // Change cursor to pointer for better UX
                transition: "background-color 0.3s", // Smooth transition for hover
              }}
              onClick={handleOpenModal}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "black"; // Change background on hover
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#034aac"; // Revert background on mouse leave
              }}
            >
              Know More
            </div>
            <div
              style={{
                padding: "1rem 2rem",
                borderRadius: "10px",
                backgroundColor: "#4caf50",
                fontSize: "14px",
                color: "white", // Set text color for better visibility
                textAlign: "center", // Center the text
                cursor: "pointer", // Change cursor to pointer for better UX
                transition: "background-color 0.3s", // Smooth transition for hover
              }}
              onClick={() => handleNavigate()} ///interview-details
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffa726"; // Change background on hover
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4caf50"; // Revert background on mouse leave
              }}
            >
              Schedule Mock Interview
            </div>
          </div>
        </CardActions>
      </Card>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          className="model-container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ececff",
            border: "1px solid #034aac",
            padding: "2rem",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <div className="close-button-modal" onClick={handleCloseModal}>
            <HighlightOffIcon sx={{ fontSize: 30 }} className="custom-icon" />
          </div>
          {/* Display job details in the modal */}
          <div className="company-name">{jobData.Company}</div>
          <div className="job-title">{jobData.Title}</div>
          <div className="job-description">{jobDescription}</div>
          {/* Display other job details here */}
          <Link to={jobData["Data-Href"]} target="_blank">
            <Button
              sx={{
                color: "grey",
                fontSize: "14px",
                "&:hover": {
                  color: "blue",
                  background: "lightgrey",
                },
              }}
            >
              Apply
            </Button>
          </Link>
          <div
            style={{
              padding: "1rem 2rem",
              borderRadius: "10px",
              backgroundColor: "#4caf50",
              fontSize: "15px",
              color: "white", // Set text color for better visibility
              textAlign: "center", // Center the text
              cursor: "pointer", // Change cursor to pointer for better UX
              transition: "background-color 0.3s", // Smooth transition for hover
            }}
            onClick={() => handleNavigate()} ///interview-details
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ffa726"; // Change background on hover
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4caf50"; // Revert background on mouse leave
            }}
          >
            Schedule Mock Interview
          </div>
        </div>
      </Modal>
    </>
  );
};

JobCard.propTypes = {
  company: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  // jobType: PropTypes.string.isRequired,
  jobSalary: PropTypes.string.isRequired,
};

export default JobCard;
