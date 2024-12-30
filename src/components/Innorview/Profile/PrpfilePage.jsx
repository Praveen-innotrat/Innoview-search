import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../../Header/Header";
import Cookies from "js-cookie";
import axios from "axios";
import API_URLS from "../../../config";
import { formatPhoneNumber } from "../../../Utils";
import "./Profile.css";
import BackButton from "../ListedJobs/JobDescription/BackButton/BackButton";

const StyledComponent = styled("div")({
  color: "#1a1a1a",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1.5rem",
  backgroundColor: "#f9fafb",
  border: "1px solid #d1d5db",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const ProfileWrapper = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f3f4f6",
  alignItems: "center",
});

const ProfileContainer = styled(Container)({
  marginTop: "4rem",
  padding: "2rem",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "800px",
});

const ProfilePage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
          setUserDetails({
            name: profile.name,
            number: profile.mobile_number,
            email: profile.email,
            resume: profile.resume,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
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
    <ProfileWrapper>
      <Header />
      <BackButton path={"/innorview"} value={""} />
      <ProfileContainer>
        <StyledComponent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Your Profile
          </Typography>
        </StyledComponent>
        <Divider />

        <Box
          sx={{
            padding: "1.5rem",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : (
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
                  Contact:{" "}
                  {isEditing ? (
                    <TextField
                      name="number"
                      value={userDetails.number}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    formatPhoneNumber(userDetails.number)
                  )}
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
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Resume
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
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
                      <Typography>{userDetails.resume}</Typography>
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
          )}
        </Box>
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default ProfilePage;
