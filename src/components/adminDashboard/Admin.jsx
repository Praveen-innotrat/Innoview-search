import React, { useState } from "react";
import styled from "styled-components";
import CardContent from "@mui/material/CardContent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Quotation from "../Quotation";
import TaxInvoice from "../TaxInvoice";
import Exception from "../Exception";
import LogisticDetails from "../LogisticDetails";
import Navbar from "../layout-components/Navbar";
import UploadQuatation from "./pages/Quatation/UploadQuatation";
import TaxInvoiceUpload from "./pages/Taxinvoice/TaxInvoiceUpload";
import ExceptionUpload from "./pages/exception/ExceptionUpload";
import OrderDetailsPage from "../../pages/OrderId";
import OrderDetails from "./pages/orderDetail/OrderDetails";

const isLoggedIn = true;
const DialogContentStyles = {
  fontSize: "40px",
  // marginTop: "40px",
  paddingTop: "40px",
  // Adjust the font size as needed
  // Adjust the padding as needed
};
const CustomDialogContent = styled(CardContent)(DialogContentStyles);

const DialogOrderCard = styled(Card)({
  width: "500px",
  height: "77vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  overflowY: "auto",
  margin: "0 auto",
  boxShadow: "none",
});

//separate style for separate dialog
// quatation
const DialogStyles = {
  fontSize: "20px",
  paddingTop: "40px",
};
const CustomDialog = styled(CardContent)(DialogStyles);
const DialogCard = styled(Card)({
  width: "500px",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  fontSize: "20px",
  overflow: "auto",
  margin: "15px auto",
  boxShadow: "none",
});

//

const OrderDetailsDialog = () => {
  return (
    <>
      <OrderDetails />
    </>
  );
};

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  minHeight: "100vh",
  // backgroundColor: "lightblue",
});
const CardContainer = styled("div")({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "70px",
});
const OrderCard = styled(Card)({
   width: "calc(33.33% - 40px)",
  height: "140px",
  transition: "transform 0.5s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontSize: "12px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
  "@media (max-width: 600px)": {
    width: "calc(50% - 10px)",
    height: "120px",
    fontSize: "15px",
  },
});
const QuotationDialog = () => {
  return (
   
    <>
     
      <UploadQuatation />
    </>
  );
};
const TaxInvoiceDialog = () => {
  return (
  
    <>
      <TaxInvoiceUpload />
    </>
  );
};
const ExceptionDialog = () => {
  return (
   
    <>
      <ExceptionUpload />
    </>
  );
};

const LogisticDetailsDialog = () => {
  return (
   
    <>
      <LogisticDetails />
    </>
  );
};

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [openEnquiryForm, setOpenEnquiryForm] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = (cardTitle) => {
    setSelectedCardTitle(cardTitle);
    if (cardTitle === "Submit") {
      navigate("/submit");
    } else {
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <PageContainer>
        <Navbar isLoggedIn={isLoggedIn} />
        <CardContainer>
          <OrderCard onClick={() => handleCardClick("Order ID")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "6px", textAlign: "center" }}>
              View order Details
            </CardContent>
          </OrderCard>

          <OrderCard onClick={() => handleCardClick("Quotation")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "6px", textAlign: "center" }}>
              Quatation Upload
            </CardContent>
          </OrderCard>
          <OrderCard onClick={() => handleCardClick("Tax Invoice")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "6px", textAlign: "center" }}>
              TaxInvoice Upload
            </CardContent>
          </OrderCard>
          <OrderCard onClick={() => handleCardClick("Exception")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "6px", textAlign: "center" }}>
              Exception Upload
            </CardContent>
          </OrderCard>
          <OrderCard onClick={() => handleCardClick("Logistic Detail")}>
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "6px", textAlign: "center" }}>
              Logistic Details
            </CardContent>
          </OrderCard>
        </CardContainer>
      </PageContainer>

      {/* order id dialog */}
      <Dialog
        open={openModal && selectedCardTitle === "Order ID"}
        onClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Order Details
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent  style={{ overflow: "hidden", justifyContent: "flex-start" }} >
          <DialogOrderCard style={{ justifyContent: "flex-start" }}>
            <CustomDialogContent   style={{ overflow: "hidden", marginTop: "-30px", width: "100%" }}>
              <OrderDetailsDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>
      {/* Quatation upload */}
      <Dialog
        open={openModal && selectedCardTitle === "Quotation"}
        onClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Quotation
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>

        <DialogContent style={{ overflowY: "hidden" }}>
          <DialogCard>
            <CustomDialog>
              <QuotationDialog />
            </CustomDialog>
          </DialogCard>
        </DialogContent>
      </Dialog>

      {/* Taxinvoice dialog */}

      <Dialog
        open={openModal && selectedCardTitle === "Tax Invoice"}
        onClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Tax Invoice
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent style={{ overflowY: "hidden" }}>
          <DialogCard>
            <CustomDialog>
              <TaxInvoiceDialog />
            </CustomDialog>
          </DialogCard>
        </DialogContent>
      </Dialog>
      {/* exception download */}
      <Dialog
        open={openModal && selectedCardTitle === "Exception"}
        onClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Exception
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent style={{ overflowY: "hidden" }}>
          <DialogCard>
            <CustomDialog>
              <ExceptionDialog />
            </CustomDialog>
          </DialogCard>
        </DialogContent>
      </Dialog>
      {/* logistic detail download */}

      <Dialog
        open={openModal && selectedCardTitle === "Logistic Detail"}
        onClose={handleCloseModal}
      >
        <DialogTitle style={{ fontSize: "24px" }}>
          Logistic Detail
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent style={{ overflowY: "hidden" }}>
          <DialogOrderCard>
            <CustomDialogContent>
              <LogisticDetailsDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
