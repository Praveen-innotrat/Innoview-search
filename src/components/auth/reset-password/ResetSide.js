import React from "react";
import { styled } from "@mui/system";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem,
  // IconButton,
  // OutlinedInput,
  // InputLabel,
  // InputAdornment,
  // FormControl,
} from "@mui/material";
import API_URLS from "../../../config";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const SectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

export default function ResetSide() {
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState(
    "Enter your phone number and new password to reset your password."
  );
  const [countryCode, setCountryCode] = React.useState("+91");

  const navigate = useNavigate();
  const baseUrl = API_URLS.innofabapi;

  const handlePhoneChange = (e) => {
    const regex = /^[+0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const submitReset = () => {
    const reqURL = `${baseUrl}/reset_password`;
    const mobile_number = countryCode + phone;
    navigate("/verifyResetOtp");

    fetch(reqURL, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: mobile_number,
      }),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.success === true) {
              localStorage.setItem("mobile_number", mobile_number);
              setMessage(data.message);
            } else {
              setMessage(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SectionContainer>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/images/login/reset.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon
                sx={{
                  color: "white",
                }}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot your password
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                select
                required
                fullWidth
                name="countryCode"
                label="Country Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <MenuItem value="+91">+91 (India)</MenuItem>
                <MenuItem value="+1">+1 (USA)</MenuItem>
                {/* Add more country codes as needed */}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone number"
                label="Phone Number"
                id="phone number"
                type="text"
                value={phone}
                onChange={(e) => {
                  handlePhoneChange(e);
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitReset}
              >
                Request Password Reset
              </Button>
              <Typography
                variant="body2"
                textAlign="center"
                sx={{ color: "#757575" }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
