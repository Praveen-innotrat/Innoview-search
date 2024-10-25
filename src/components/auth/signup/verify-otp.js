import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../config";

export default function VerifyOTP() {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = API_URLS.base;



  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqURL = `${baseUrl}/verify_otp1`; 
  
    fetch(reqURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: localStorage.getItem('mobile_number'),
        otp: otp,
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
          localStorage.removeItem('mobile_number')
        //   window.location.href = "/login";
        navigate("/eureka")
        // navigate(-1)
        } else {
          toast.error("Invalid OTP, please try again");
        }
      })
      .catch((error) => {
        toast.error("OTP verification failed");
        console.log(error);
      });
  };
  

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
        Verify OTP
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
        <Typography variant="body2" textAlign="center" mt={2} sx={{ color: "#757575" }}>
          {message}
        </Typography>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
}
