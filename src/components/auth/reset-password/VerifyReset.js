import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from 'react-toastify';
import API_URLS from "../../../config";

export default function VerifyResetOTP() {
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const mobileNumber = localStorage.getItem("mobile_number");
  const baseUrl = API_URLS.base;
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqURL = `${baseUrl}/verify_reset_password`;

    fetch(reqURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: mobileNumber,
        otp: otp,
        new_password: newPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("OTP verification failed");
        }
      })
      .then((data) => {
        if (data.success === true) {
          toast.success("OTP verification successful");
          localStorage.removeItem("mobile_number");
          window.location.href = "/eureka";
        } else {
          toast.error("Invalid OTP, please try again");
        }
      })
      .catch((error) => {
        toast.error("OTP verification failed");
        console.log(error);
      });
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("mobile_number");
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center">
        Verify OTP and Set New Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="OTP"
          value={otp}
          onChange={handleOTPChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Typography variant="body2" textAlign="center" mt={2} sx={{ color: "#757575" }}>
          {message}
        </Typography>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Verify OTP and Set Password
        </Button>
      </Box>
    </Box>
  );
}
