import React, { useState } from "react";
import "./Recruiter.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecruitersDashboard from "./Dashboard";
import MyProfile from "./MyProfile";
import PostJobForm from "./PostJobForm";
import PostedJobs from "./PostedJobs";

function AfterLogin() {
  const [activeTab, setActiveTab] = useState("dashboard"); // Initialize active tab
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false); // State for dropdown visibility

  // Function to render the current tab content based on activeTab state
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <RecruitersDashboard />;
      case "profile":
        return <MyProfile />;
      case "posts":
        return <PostedJobs />;
      case "postJob":
        return <PostJobForm />;
      case "settings":
        return <h1>Settings</h1>;
      case "help":
        return <h1>Help</h1>;
      default:
        return null;
    }
  };

  // Toggle dropdown
  const handleProfileClick = () => {
    setProfileDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="after-login-main-page">
      <div className="side-bar-wrapper">
        <div className="side-bar-contents">
          <div className="company-name">Innotrat Labs</div>
          <div className="sidebar-list">
            <div
              className="sidebar-opts"
              onClick={() => setActiveTab("dashboard")}
            >
              <DashboardIcon fontSize="large" /> Dashboard
            </div>
            <div
              className="sidebar-opts"
              onClick={handleProfileClick} // Toggle dropdown on profile click
            >
              <AccountCircleIcon fontSize="large" /> My Profile
              <span className="dropdown-arrow">
                {isProfileDropdownOpen ? "▲" : "▼"}
              </span>{" "}
              {/* Arrow indicator */}
            </div>
            {isProfileDropdownOpen && ( // Render dropdown if open
              <div className="profile-dropdown">
                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setActiveTab("profile");
                    setProfileDropdownOpen(false); // Close dropdown after selection
                  }}
                >
                  <AccountCircleIcon /> Profile
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setActiveTab("posts");
                    setProfileDropdownOpen(false); // Close dropdown after selection
                  }}
                >
                  <AddCircleOutlineIcon /> Posts
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setActiveTab("postJob");
                    setProfileDropdownOpen(false); // Close dropdown after selection
                  }}
                >
                  <EditIcon /> Post a Job
                </div>
              </div>
            )}
            <div
              className="sidebar-opts"
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon fontSize="large" /> Settings
            </div>
            <div className="sidebar-opts" onClick={() => setActiveTab("help")}>
              <HelpIcon fontSize="large" /> Help
            </div>
          </div>
        </div>

        <div className="body-content">
          <div className="recruiter-tab-content">
            {renderTabContent()} {/* Render the content based on active tab */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;
