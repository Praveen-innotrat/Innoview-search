import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Footer from "./layout-components/Footer";
import Footer from "./Footer/Footer";
import Navbar from "./layout-components/Navbar";
import Header from "./Header/Header";
const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 20px",
  minHeight: "95vh",
  background: "rgb(236, 236, 255)",
  height:"100vh"

});

const OrderCard = styled(Card)({
  width: "200px", // Adjust the width as needed
  height: "150px", // Adjust the height as needed
  transition: "transform 0.5s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 2px 4px  rgba(0,0,0,0.5)",
  justifyContent: "center",
  textDecoration: "none",
  "@media (max-width: 600px)": {
    width: "150px",
    height: "150px",
  },
});

const CardContainer = styled("div")({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "70px", // Adjust the spacing from the top
});

const LargeCardContent = styled(CardContent)({
  fontSize: "15px", // Adjust the font size as needed
  marginTop: "10px",
});
// const LargeIcon = styled("span")({
//     fontSize: "56px", // Adjust the icon size as needed
//   });

const OrderSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const navigate = useNavigate();
  // const isLoggedIn= false;

  const handleCardClick = (cardTitle) => {
    setSelectedCardTitle(cardTitle);
    if (cardTitle === "Submit") {
      navigate("/submit");
    } else if (cardTitle === "InnoMart") {
      navigate("/innomat");
    } else {
      setOpenModal(true);
    }
  };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <>
      <PageContainer>
        {/* <Navbar /> */}
        <Header/>
        {/* <Navbar isLoggedIn={isLoggedIn} />   */}
        <CardContainer>
          <OrderCard onClick={() => handleCardClick("Submit")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />

            <LargeCardContent>Submit Design Gerber</LargeCardContent>
          </OrderCard>
          {/* <OrderCard onClick={() => handleCardClick("InnoMart")}>
            <DescriptionIcon sx={{ fontSize: "36px" }} />
            <LargeCardContent>InnotMart</LargeCardContent>
          </OrderCard> */}
          {/* <OrderCard onClick={() => handleCardClick("Enquiry Form")}>
         <DescriptionIcon sx={{ fontSize: "36px" }}/>
          <LargeCardContent>Enquiry Form</LargeCardContent>
        </OrderCard> */}
        </CardContainer>
      </PageContainer>
      {/* <Footer /> */}
    </>
  );
};

export default OrderSection;