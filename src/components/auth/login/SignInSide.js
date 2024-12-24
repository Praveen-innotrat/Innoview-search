import React, { useState } from "react";
import Cookies from "js-cookie";
import { styled } from "@mui/system";
import API_URLS from "../../../config";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Login from "../../../assets/Logins/login.svg";
import "./SignIn.css";

const SectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%",
  background: "#ececff",
}));

export default function SignInSide() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseUrl = API_URLS.base;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Formik and Yup Setup
  const formik = useFormik({
    initialValues: {
      countryCode: "+91",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      countryCode: Yup.string().required("Country code is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers are allowed")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(3, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const reqURL = `${API_URLS.InnoviewBaseUrl}/login`;
      try {
        setLoading(true);
        const response = await axios.post(reqURL, {
          mobile_number: values.countryCode + values.phone,
          password: values.password,
        });
        const data = response.data;

        if (data.success) {
          localStorage.setItem("auth-token", data.token);
          Cookies.set("mobile_number", data.mobile_number, {
            secure: true,
            expires: 7,
            path: "/",
          });
          Cookies.set("user_name", data.username, {
            secure: true,
            expires: 7,
            path: "/",
          });
          Cookies.set("token", data.token, {
            secure: true,
            expires: 7,
            path: "/",
          });
          toast.success(data.message);
          navigate("/innorview");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="login-container-tab">
      <div className="login-image-wrapper">
        <img className="login-image" src={Login} alt="login-image" />
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
            <LockOutlinedIcon sx={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
            noValidate
          >
            <TextField
              margin="normal"
              select
              required
              fullWidth
              name="countryCode"
              label="Country Code"
              value={formik.values.countryCode}
              onChange={formik.handleChange}
              error={
                formik.touched.countryCode && Boolean(formik.errors.countryCode)
              }
              helperText={
                formik.touched.countryCode && formik.errors.countryCode
              }
            >
              <MenuItem value="+91">+91 (India)</MenuItem>
              <MenuItem value="+1">+1 (USA)</MenuItem>
              {/* Add more country codes as needed */}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                id="password"
                required
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
            <div className="form-wrapper">
              <Link
                href="/reset-password"
                variant="body2"
                style={{ fontSize: "14px" }}
              >
                Forgot password?
              </Link>
              <div>
                <span className="signup-indicator">Don't have an account?</span>
                <Link
                  href="/sign-up"
                  variant="body2"
                  style={{ fontSize: "14px" }}
                >
                  {" Sign Up"}
                </Link>
              </div>
            </div>
            <div className="signin-button-container">
              <Button
                className="login-button-inno"
                sx={{ mt: 3, mb: 2, fontSize: 14 }}
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                sx={{ fontSize: 14, width: "max-content" }}
                onClick={() => navigate(-1)}
              >
                BACK
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
