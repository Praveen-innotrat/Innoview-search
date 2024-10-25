import { Box, Container, Typography } from "@mui/material";
import PricingCard from "./PricingCard";
import { useState } from "react";
import FAQ from "./FAQ";
import ToggleButton from "./ToggleButton";
import Header from "../../Header/Header";
import { flexbox } from "@mui/system";
// import huebg from "../../assets/huebg.png";
// import "../styles/PricingCard.css";


const SubscriptionPlan = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };
  const initialPricingData = [
    {
      plan: "Basic",
      annualPrice: 99,
      monthlyPrice: 10,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      isAnnual: true,
      buttonText: "Get Started",
    },
    {
      plan: "Standard",
      annualPrice: 199,
      monthlyPrice: 20,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      isAnnual: true,
      buttonText: "Get Started",
    },
    {
      plan: "Premium",
      annualPrice: 299,
      monthlyPrice: 30,
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      isAnnual: true,
      buttonText: "Get Started",
    },
  ];

  const [pricingData, setPricingData] = useState(initialPricingData);

  // const handleToggleAll = () => {
  //   setPricingData((prevData) => {
  //     const newData = prevData.map((item) => ({
  //       ...item,
  //       isAnnual: !item.isAnnual,
  //     }));
  //     return newData;
  //   });
  // };

  return (
    <>
      <div style={{
        background: "#ececff",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        "&:hover": {
          borderColor: "#034aac",
        },
      }}> 


      <Header/>

        <div className="pricing-card-wrapper">
          <div className="pricing-card-bg"></div>

          <section
            style={{
              marginTop: "4rem",
              
            }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexDirection: {
                    xs: "column",
                    lg: "row",
                    md: "row",

                  },
                  color: "#0a2540",
                }}
              >
                Subscription <span style={{ color: "#034aac" }}> Plan</span>
              </Typography>
            </Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "2rem",
                paddingBottom: "2rem",
              }}
            >
              <ToggleButton isAnnual={isAnnual} onToggle={handleToggle} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                  md: "row",
                },
                justifyContent: "space-around",
                gap: "10px",
                height: "100%",
                marginTop: "2rem",
                alignItems: "center",
                paddingBottom: "2rem",
              }}
            >
              {pricingData.map((pricing, index) => (
                <PricingCard
                  key={index}
                  {...pricing}
                  // onToggle={(isAnnual) => handleToggleAll(index, isAnnual)}
                  isAnnual={isAnnual}
                  onToggle={handleToggle}
                />
              ))}
            </Box>
          </section>
          <section>
            <Typography textAlign="center" variant="h2">
              FAQ
            </Typography>
            <Container
              maxWidth="md"
              sx={{
                paddingTop: "4rem",
                paddingBottom: "4rem",
              }}
            >
              <FAQ />
            </Container>
          </section>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;
