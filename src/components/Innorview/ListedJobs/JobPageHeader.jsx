import { Box, Container, Grid, Typography } from "@mui/material";

import job from "../../../assets/job.png";
import heroBg from "../../../assets/hero-bg.jpg";

const JobPageHeader = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: "4rem",
          backgroundColor: "#f8f9fd",
          padding: "0rem",
        }}
      >
        <Box>
          <Grid
            container
            sx={{
              flexDirection: {
                xs: "column",
                sm: "column",
                lg: "row",
              },
            }}
            alignItems={"center"}
            columns={16}
          >
            <Grid item xs={16} lg={8} md={12}>
              <Typography
                textAlign={"center"}
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "2.5rem",
                    sm: "4rem",
                    lg: "3rem",
                    md: "3rem",
                  },
                }}
                component="div"
                gutterBottom
              >
                Supporting {""}
                <span
                  style={{
                    backgroundColor: "#0093E9",
                    backgroundImage:
                      "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Job Seekers
                </span>{" "}
                Every Step of the Way
              </Typography>
            </Grid>
            <Grid
              item
              lg={8}
              sm={16}
              md={16}
              xs={16} // 12 columns on small screens
              sx={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
              }}
            >
              <img
                src={job}
                style={{
                  maxWidth: "100%",
                  display: "block",

                  height: "auto",
                  objectFit: "cover",
                  margin: "auto",
                }}
                alt=""
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default JobPageHeader;
