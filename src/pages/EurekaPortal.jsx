import React from "react";
import EurekaSidebar from "./EurekaSidebar";
import backgroundImage from "../assets/right-side-background.png";
import { Outlet } from "react-router";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./EurekaPortal.css";

export default function EurekaPortal() {
  return (
    <div className="eureka-container">
      <div className="left-sidebar">
        <EurekaSidebar />
      </div>

      <div
        className="right-sidebar"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Outlet />
        <Paper
          className="search-container"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            width: 700,
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ width: "700px" }}
            placeholder="Start a conversation"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", marginLeft: "0px", width: "40px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
