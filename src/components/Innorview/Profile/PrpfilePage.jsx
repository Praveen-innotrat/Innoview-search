import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../../Header/Header";
import Cookies from "js-cookie";
import axios from "axios";
import API_URLS from "../../../config";
import { formatPhoneNumber } from "../../../Utils";

const MyComponent = styled("div")({
  color: "#000000",
  padding: 8,
  borderRadius: 4,
  marginBottom: "1rem",
  backdropFilter: "blur(20px)",
  border: "1px solid #50719e",
});

const ProfileComponent = styled("div")({
  height: "100%",
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const ProfilePage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    number: "",
    email: "",
    resume: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const response = await axios.get(
            `${API_URLS.InnoviewBaseUrl}/api/user/profile`,
            {
              headers: {
                authorization: `${token}`,
              },
            }
          );
          const { profile } = response.data;
          console.log(profile, "profile");
          setUserDetails({
            name: profile.name,
            number: profile.mobile_number,
            email: profile.email,
            resume: profile.resume,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleResumeFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("email", userDetails.email);
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${token}`,
          },
        }
      );

      console.log("Resume uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="profile-card-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ececff",
      }}
    >
      <Header />
      <div className="profile-card-bg"></div>

      <ProfileComponent>
        <Container
          sx={{
            marginTop: "4rem",
            paddingTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <MyComponent>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Your Profile
            </Typography>
          </MyComponent>
          <Divider />

          <Box
            elevation={6}
            sx={{
              padding: "1rem",
              backdropFilter: "blur(20px)",
              backgroundColor: "",
              color: "#000000",
              borderRadius: "10px",
              border: "1px solid #50719e",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Name:{" "}
                  {isEditing ? (
                    <TextField
                      name="name"
                      value={userDetails.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    userDetails.name
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contact: {formatPhoneNumber(userDetails.number)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Email:{" "}
                  {isEditing ? (
                    <TextField
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    userDetails.email
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <div>Upload Resume</div>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%",
                        xl: "300px",
                      },
                    }}
                  >
                    {isEditing ? (
                      <TextField
                        type="file"
                        required
                        onChange={handleResumeFileChange}
                        inputProps={{ accept: ".pdf, .doc, .docx" }}
                      />
                    ) : (
                      userDetails.resume
                    )}

                    {isEditing ? (
                      <Button type="submit" variant="contained" color="primary">
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEditClick}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ProfileComponent>
    </div>
  );
};

export default ProfilePage;
