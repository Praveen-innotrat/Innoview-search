import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import "./EurekaSidebar.css";

export default function EurekaSidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-dynamic-part">
        <div className="heading">
          <h1 style={{color:"#034AAC"}}>Eureka</h1>
          <p style={{color:"grey", fontSize:"10px"}}>Your personal assistant</p>
        </div>
        <p>New Chat</p>
        <p>History</p>
      </div>

      <div className="sidebar-static-part">
        <p> <HelpOutlineIcon fontSize="large" /> Help</p>
        <p><SettingsIcon fontSize="large"/> Setting</p>
      </div>
    </div>
  );
}
