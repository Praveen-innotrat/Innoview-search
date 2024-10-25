import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Navbar from "./layout-components/Navbar";
// import Footer from "../components/layout-components/Footer";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Styled component for the Grid container
const StyledGrid = styled(Grid)(({ theme }) => ({
  // height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  background: "#ececff",

  [theme.breakpoints.down("sm")]: {
    background: "#ececff",
    display: "flex",
    gap: "0px",
  },
}));

// Styled component for the Card
const StyledCard = styled(Card)({
  width: "200px",
  height: "130px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  // margin: "auto",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
});

// Styled component for the Grid item
const StyledGridItem = styled(Grid)({
  margin: "10px", // Adjust the spacing as needed
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flex: "wrap",
});

const cardTextStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "18px",
  fontWeight: "bold",
  lineHeight: "1.4",
};

const cardIconStyle = {
  fontSize: "36px",
};

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )

    setIsLoggedIn(userIsLoggedIn);
  }, []);
  const navigate = useNavigate();

  const nav = () => {
    if (isLoggedIn) {
      navigate("/innorview");
    } else {
      navigate("/eureka");
    }
  };

  return (
    <div>
      <StyledGrid
        container
        // spacing={0.5} // Reduce the gap between grid items to 0
        // justifyContent="space-between"
      >
        {/* <Navbar /> */}

        <Header />
        {/* <div className="flex w-[441px] flex-wrap mt-[70x]   justify-start items-center h-[100vh]"> */}
        <div className="h-[100vh] flex flex-wrap justify-center">
          <div className="sm:flex-col items-center justify-center">
            <StyledGridItem
              className="hover:scale-95 duration-500 ease-in-out cursor-pointer"
              onClick={nav}
            >
              <StyledCard>
                <CurrencyExchangeIcon style={cardIconStyle} />
                <CardContent>
                  <Typography variant="h6" style={cardTextStyle}>
                    <span style={{ textDecoration: "none", color: "inherit" }}>
                      InnoView
                    </span>
                  </Typography>
                </CardContent>
              </StyledCard>
            </StyledGridItem>
          </div>
        </div>
      </StyledGrid>
      {/* Add the Footer component below the grid */}
      <></>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
