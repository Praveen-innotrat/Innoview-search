import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ErrorIcon from "@mui/icons-material/Error";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Quotation from "./Quotation";
import OrderDetails from "./OrderId";
import Payment from "./Payment";
import TaxInvoice from "./TaxInvoice";
import Exception from "./Exception";
import LogisticDetails from "./LogisticDetails";
import HistoryIcon from "@mui/icons-material/History";
import OrderHistory from "./OrderHistory";
import Navbar from "./layout-components/Navbar";
import RaiseTicketForm from "./RaiseTicket";
// import Footer from "../components/layout-components/Footer";
import { useMessage } from "./context/MessageContext";
import { DialogContentText } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // padding: "20px",
  // minHeight: "100vh",
  // backgroundColor: "lightblue",
});

const OrderCard = styled(Card)({
  width: "calc(24.33% - 40px)",
  height: "120px",

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
const CenteredButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end", // Align the button to the right
  alignItems: "center",
  // position: "fixed",
  // bottom: "20px",
  marginBottom: "20px",
  // padding: "20px",
  // left:"670px"
});

const CardContainer = styled("div")({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "70px",
});

const DialogContentStyles = {
  fontSize: "40px",

  // marginTop: "40px",
  // paddingTop: "40px",
  // Adjust the font size as needed
  // Adjust the padding as needed
};
const CustomDialogContent = styled(CardContent)(DialogContentStyles);

// logistic custum dialog
const LogisticContentStyle = {
  fontSize: "25px",
};
const LogisticContent = styled(CardContent)(LogisticContentStyle);

const DialogOrderCard = styled(Card)({
  width: "500px",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: "20px",
  overflow: "hidden",
  // margin: "0 auto",
  boxShadow: "none",
});
const RaiseTicketDialogOrderCard = styled(Card)({
  // width: "500px",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: "20px",
  overflow: "hidden",
  // margin: "0 auto",
  boxShadow: "none",
});

const OrderDetailsDialog = () => {
  return (
    <>
      <OrderDetails />
    </>
  );
};

const QuotationDialog = () => {
  return (
    // Replace with the content for the Quotation modal
    <>
      <Quotation />
    </>
  );
};

const ProformaInvoiceDialog = () => {
  return (
    // Replace with the content for the Proforma Invoice modal
    <>
      <Payment />
    </>
  );
};

const TaxInvoiceDialog = () => {
  return (
    // Replace with the content for the Tax Invoice modal
    <>
      <TaxInvoice />
    </>
  );
};

const ExceptionDialog = () => {
  return (
    // Replace with the content for the Exception modal
    <>
      <Exception />
    </>
  );
};

const LogisticDetailsDialog = () => {
  return (
    // Replace with the content for the Logistic Detail modal
    <>
      <LogisticDetails />
    </>
  );
};
const RaiseTicketDialog = () => {
  return (
    // Replace with the content for the Logistic Detail modal
    <>
      <RaiseTicketForm />
    </>
  );
};

const OrderSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [openEnquiryForm, setOpenEnquiryForm] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = true;

  const handleCardClick = (cardTitle) => {
    setSelectedCardTitle(cardTitle);
    if (cardTitle === "Submit") {
      navigate("/submit");
    } else {
      setOpenModal(true);
    }
    // if (cardTitle === "Order History") {
    //   setOpenModal(true);
    // }
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate back
  };
  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };
  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <PageContainer style={{ minHeight: "100vh", background:"#ececff" }}>
        {/* <Navbar isLoggedIn={isLoggedIn} /> */}
        <Header/>
        <CardContainer>
          {/* upload gerber */}
          <OrderCard
            onClick={() => handleCardClick("Submit")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            {/* Replace with the appropriate icon */}
            <CardContent>Upload Gerber</CardContent>
          </OrderCard>

          {/* view order */}
          <OrderCard
            onClick={() => handleCardClick("Order ID")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: "36px" }} />
            <CardContent
            // style={{ marginTop: "6px", textAlign: "center" }}
            >
              View Orders
            </CardContent>
          </OrderCard>
          {/* Quatation */}
          <OrderCard
            onClick={() => handleCardClick("Quotation")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <DescriptionIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>Quotation</CardContent>
          </OrderCard>
          {/* payment */}
          <OrderCard
            onClick={() => handleCardClick("Proforma Invoice")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <ReceiptIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>Payment</CardContent>
          </OrderCard>

          {/* Taxinvoice */}
          <OrderCard
            onClick={() => handleCardClick("Tax Invoice")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>Tax Invoice</CardContent>
          </OrderCard>
          {/* Exception */}
          <OrderCard
            onClick={() => handleCardClick("Exception")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <ErrorIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>Exception</CardContent>
          </OrderCard>
          {/* logistic details */}
          <OrderCard
            onClick={() => handleCardClick("Logistic Detail")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <LocalShippingIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>
              Logistic Detail
            </CardContent>
          </OrderCard>
          {/* order history */}
          <OrderCard
            onClick={() => handleCardClick("Order History")}
            className="flex flex-col gap-2"
            sx={{
              ".MuiCardContent-root": {
                padding: "0px",
              },
            }}
          >
            <HistoryIcon sx={{ fontSize: "36px" }} />
            <CardContent style={{ marginTop: "5px" }}>
              Order History
            </CardContent>
          </OrderCard>
        </CardContainer>
      </PageContainer>

      {/* Order ID Dialog */}
      <Dialog
        open={openModal && selectedCardTitle === "Order ID"}
        onClose={handleCloseModal}
        className="h-auto"
      >
        <DialogTitle
          sx={{
            fontSize: "24px",

            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0px",
          }}
        >
          Order Details
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent
          style={{
            overflow: "hidden",
            justifyContent: "flex-start",
          }}
        >
          <DialogOrderCard style={{ justifyContent: "flex-start" }}>
            <CustomDialogContent
              style={{ overflow: "hidden", width: "100%", padding: "0px" }}
            >
              <OrderDetailsDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Quotation Dialog */}
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
          <DialogOrderCard>
            <CustomDialogContent>
              <QuotationDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Proforma Invoice Dialog */}
      <Dialog
        open={openModal && selectedCardTitle === "Proforma Invoice"}
        onClose={handleCloseModal}
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Payment
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
              <ProformaInvoiceDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Tax Invoice Dialog */}
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
          <DialogOrderCard>
            <CustomDialogContent>
              <TaxInvoiceDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Exception Dialog */}
      <Dialog
        open={openModal && selectedCardTitle === "Exception"}
        onClose={handleCloseModal}
        sx={{
          ".MuiCardContent-root": {
            padding: "0px",
          },
        }}
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
          <DialogOrderCard>
            <CustomDialogContent style={{ width: "100%" }}>
              <ExceptionDialog />
            </CustomDialogContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* order history dialog */}

      <Dialog
        open={openModal && selectedCardTitle === "Order History"}
        onClose={handleCloseModal}
        sx={{
          ".MuiPaper-root": {
            maxWidth: "1100px",
          },
        }}
      >
        <DialogTitle>
          <span className="text-5xl"> Order History</span>
          <Button
            onClick={handleCloseModal}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>

        <DialogContent className="w-auto h-auto ">
          <OrderHistory />
        </DialogContent>
      </Dialog>

      {/* Logistic Detail Dialog */}
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
            <LogisticContent style={{ width: "100%" }}>
              <LogisticDetailsDialog />
            </LogisticContent>
          </DialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Enquire dialog */}
      <Dialog
        open={openEnquiryForm}
        onClose={handleCloseEnquiryForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "24px" }}>
          Raise a Ticket
          <Button
            onClick={handleCloseEnquiryForm}
            color="warning"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </Button>
        </DialogTitle>
        <DialogContent style={{ overflowY: "hidden" }}>
          <RaiseTicketDialogOrderCard>
            <CustomDialogContent>
              <RaiseTicketDialog />
            </CustomDialogContent>
          </RaiseTicketDialogOrderCard>
        </DialogContent>
      </Dialog>

      {/* Raise Ticket */}
      <CenteredButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenEnquiryForm}
          style={{
            // Increase the font size
            fontSize: "13px",
          }}
        >
          Raise a Ticket
        </Button>
      </CenteredButtonContainer>
      {/* <Footer /> */}
      <></>
    </>
  );
};

export default OrderSection;
