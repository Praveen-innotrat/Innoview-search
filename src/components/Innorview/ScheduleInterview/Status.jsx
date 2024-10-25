import React from "react";
import "./Schedule.css";
import { useLocation, useNavigate } from "react-router";

const Status = ({ close }) => {
  const location = useLocation();

  const Navigate = useNavigate();
  return (
    <div className="status-popup">
      {location.pathname === "/interview-details" ? (
        <>
          <div className="status-popup-content">
            <h1>Status</h1>
            <p>
              <strong>Strong Areas:</strong> Details about strong areas
            </p>
            <p>
              <strong>To Improve:</strong> Details about areas to improve
            </p>
            <p>
              <strong>Overall Performance:</strong> Details about overall
              performance
            </p>
            <p>
              <strong>Emotional Performance:</strong> Details about emotional
              performance
            </p>
            <p>
              <strong>Genuineness percentage:</strong> Details about genuineness
              percentage
            </p>
            <button
              className="view-profile-btn"
              onClick={() => Navigate("/profile")}
            >
              View Updated Profile
            </button>
            <button className="view-profile-btn" onClick={close}>
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="status-popup-content">
            <h1>Status</h1>
            <p>Interview Details</p>
            <button
              className="view-profile-btn"
              onClick={() => Navigate("/profile")}
            >
              View Updated Profile
            </button>
            <button className="view-profile-btn" onClick={close}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Status;
