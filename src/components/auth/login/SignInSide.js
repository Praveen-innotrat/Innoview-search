import React, { useState } from "react";
import Cookies from "js-cookie";
import { styled } from "@mui/system";
import API_URLS from "../../../config";
// import PhoneInput from 'react-phone-number-input'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
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
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const SectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  maxWidth: "100%",
  background: "#ececff",
}));

export default function SignInSide() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+91");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate({ forceRefresh: true });
  const baseUrl = API_URLS.base;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhoneChange = (e) => {
    const regex = /^[+0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  //   const reqURL = `${baseUrl}/login`;

  //   fetch(reqURL, {
  //     cache: "no-store",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  //       Pragma: "no-cache",
  //       Expires: "0",
  //     },
  //     body: JSON.stringify({
  //       mobile_number: countryCode + phone,
  //       password: password,
  //     }),
  //   })
  //     .then((res) => {
  //       res
  //         .json()
  //         .then((data) => {
  //           {
  //             console.log(data);
  //           }
  //           if (data.success === true) {
  //             console.log(data);
  //             setMessage(data.message);

  //             toast.success(data.message);
  //             Cookies.set("mobile_number", data.mobile_number, {
  //               secure: true,
  //               expires: 7,
  //               path: "/",
  //             });
  //             Cookies.set("token", data.token, {
  //               secure: true,
  //               expires: 7,
  //               path: "/",
  //             });
  //             // window.location.href = "/chat";
  //             navigate("/dashboard");
  //             // window.location.reload()
  //           } else if (data.success === false) {
  //             setMessage(data.message);
  //             toast.error(data.message);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const submitLogin = async () => {
  //   const reqURL = `${baseUrl}/login`;

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       reqURL,
  //       {
  //         mobile_number: countryCode + phone,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  //           Pragma: "no-cache",
  //           Expires: "0",
  //         },
  //       }
  //     );

  //     const data = response.data;

  //     console.log(data);

  //     if (data.success === true) {
  //       console.log(data);
  //       setMessage(data.message);
  //       toast.success(data.message);

  //       Cookies.set("mobile_number", data.mobile_number, {
  //         secure: true,
  //         expires: 7,
  //         path: "/",
  //       });

  //       Cookies.set("token", data.token, {
  //         secure: true,
  //         expires: 7,
  //         path: "/",
  //       });

  //       // window.location.href = '/chat';
  //       navigate("/dashboard");
  //       // window.location.reload();
  //     } else if (data.success === false) {
  //       setMessage(data.message);
  //       toast.error(data.message);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }

  //   // .catch(error => {
  //   //   console.log(error);
  //   // });
  // };

  const submitLogin = async () => {
    // const reqURL = `${baseUrl}/login`;
    // const reqURL = `http://localhost:4000/user/login`;
    const reqURL = `${API_URLS.InnoviewBaseUrl}/login`;

    try {
      setLoading(true);
      const response = await axios.post(
        reqURL,
        {
          mobile_number: countryCode + phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      const data = response.data;

      console.log(data);

      if (data.success === true) {
        console.log(data);
        setMessage(data.message);
        toast.success(data.message);

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
        Cookies.set("mobile_number", data.mobile_number, {
          secure: true,
          expires: 7,
          path: "/",
        });
        Cookies.set("mobile_number", data.mobile_number, {
          secure: true,
          expires: 7,
          path: "/",
        });
        // window.location.href = '/chat';
        navigate("/dashboard");
        // window.location.reload();
      } else if (data.success === false) {
        setMessage(data.message);
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }

    // .catch(error => {
    //   console.log(error);
    // });
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
            backgroundImage: "url(/images/login/login.png)",
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
              Login
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
              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">Password *</InputLabel>
                <OutlinedInput
                  id="password"
                  required
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
              {/* <Typography
                variant="body2"
                textAlign="center"
                mt={2}
                sx={{ color: "#757575" }}
              >
                {message}
              </Typography> */}
              {/* <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitLogin}
              >
                Login
              </Button> */}
              <LoadingButton
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitLogin}
                loading={loading}
                loadingPosition="center"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                <span> Login</span>
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/reset-password"
                    variant="body2"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/sign-up"
                    variant="body2"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
