import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function BackButton({ path, value }) {
  const nav = useNavigate();
  return (
    <>
      <div className="job-details-header">
        <Button
          variant="contained"
          style={{
            fontSize: 14,
            width: "max-content",
          }}
          onClick={() => {
            nav(path);
            localStorage.removeItem("ViewJobId");
          }}
          className="back-button"
        >
          <ArrowBackIosIcon /> Back {value}
        </Button>
      </div>
    </>
  );
}

export default BackButton;
