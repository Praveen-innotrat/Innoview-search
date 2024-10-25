import { Box, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../Header/Header";
// import "../styles/UserAccountDetails.css";
const MyComponent = styled("div")({
  color: "#000000",

  padding: 8,
  borderRadius: 4,
  marginBottom: "1rem",
  backdropFilter: "blur(20px)",
  border: "1px solid #50719e",
});
const MyAccount = () => {
  return (
    <>
      <div
        className="user-account-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ececff",
        }}
      >
        <Header />
        <div className="user-account-bg"></div>
        <Container
          maxWidth="md"
          sx={{
            marginTop: "6rem",
            paddingBottom: "40px",
            height: "100vh",
            // position: "absolute",
            zIndex: "0",
            
          }}
        >
          <MyComponent>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                color: "#0a2540",
              }}
              gutterBottom
            >
              Your Account Details
            </Typography>
          </MyComponent>
          <Box
            sx={{
              padding: "1rem",
              backdropFilter: "blur(20px)",
              backgroundColor: "",
              color: "#0a2540",
              borderRadius: "10px",
              border: "1px solid #50719e",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography variant="h6">Captured Details:</Typography>
              <Typography variant="h6">Plan Subscribed:</Typography>
              <Typography variant="h6">Status of Usage:</Typography>
              <Typography variant="h6">Pay must details:</Typography>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default MyAccount;
