import React from "react";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import {
  Avatar,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import "./Signup.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../config";
import axios from "axios";
import { Label } from "@mui/icons-material";
import Signup from "../../../assets/Logins/signup.svg";
import { toast } from "react-toastify";

const SectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  // justifyContent: "center",
  // alignItems: "center",
  height: "100vh",
  margin: " 20px auto",
}));

export default function SignUpSide() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [countryCode, setcountryCode] = React.useState("+91");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState(
    "Please fill in the details to sign up"
  );
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const baseUrl = API_URLS.base;
  const handlePhoneChange = (e) => {
    const regex = /^[+0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const submitSignup = async () => {
    const reqURL = `${API_URLS.InnoviewBaseUrl}/signup`;

    const mobile_number = countryCode + phone;

    const data = {
      name: name,
      //mobile_number:countryCode + phone,
      mobile_number: mobile_number,
      password: password,
    };
    try {
      const response = await axios.post(reqURL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      if (response.data.success === true) {
        setMessage(response.data.message);
        toast.success("Account created successfully");

        localStorage.setItem("mobile_number", mobile_number);
        navigate("/eureka");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        toast.error(error.response.data.message);
        setMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setMessage("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        setMessage("Error in sending request.");
      }
    }
  };

  return (
    <div className="login-container-tab">
      <div className="login-image-wrapper">
        <img className="login-image" src={Signup} alt="login-image" />
      </div>

      <div className="login-innoview-wrapper">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            className="signup-form"
            sx={{ mt: 1 }}
          >
            <div className="form-group">
              <InputLabel htmlFor="name" className="form-label">
                Name
              </InputLabel>
              <TextField
                className="form-input"
                required
                fullWidth
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <InputLabel htmlFor="countryCode" className="form-label">
                Country Code
              </InputLabel>
              <TextField
                className="form-input"
                select
                required
                fullWidth
                name="countryCode"
                value={countryCode}
                onChange={(e) => setcountryCode(e.target.value)}
              >
                <MenuItem value="+91">+91 (India)</MenuItem>
                <MenuItem value="+1">+1 (USA)</MenuItem>
              </TextField>
            </div>

            <div className="form-group">
              <InputLabel htmlFor="phone" className="form-label">
                Phone Number
              </InputLabel>
              <TextField
                className="form-input"
                required
                fullWidth
                name="phone"
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <InputLabel htmlFor="file" className="form-label">
                Upload File
              </InputLabel>
              <TextField
                className="form-input"
                required
                fullWidth
                name="file"
                id="file"
                type="file"
              />
            </div>

            <div className="form-group">
              <InputLabel htmlFor="video" className="form-label">
                Upload Video
              </InputLabel>
              <TextField
                className="form-input"
                required
                fullWidth
                name="video"
                id="video"
                type="file"
                accept="video/*"
              />
            </div>

            <div className="form-group">
              <FormControl
                className="form-input"
                variant="outlined"
                required
                fullWidth
              >
                <InputLabel htmlFor="password" className="form-label">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>

            <Typography variant="body2" className="form-message">
              {message}
            </Typography>

            <div className="button-container">
              <Button
                sx={{
                  width: "max-content", // Correct syntax
                  fontSize: 16,
                }}
                className="back-button"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                sx={{
                  fontSize: 16,
                }}
                className="signup-button"
                variant="contained"
                onClick={submitSignup}
              >
                Sign Up
              </Button>
            </div>

            <Link href="/eureka" className="login-link">
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
}
