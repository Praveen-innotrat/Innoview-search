import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import API_URLS from "../config";
import Navbar from "../components/layout-components/Navbar";
import Footer from "../components/layout-components/StickyFooter";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon
import Slide from "@mui/material/Slide"; // Import Slide for animation
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the CheckCircleIcon
import { useMessage } from "../components/context/MessageContext";

const TransactionDetails = () => {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const mobileNumber = Cookies.get("mobile_number");
  const Payment = API_URLS.baseURL;
  const navigate = useNavigate();

  console.log("transactionDetails", transactionDetails);

  useEffect(() => {
    fetch(`https://payments.innotrat.com/transaction`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data === "object") {
          setTransactionDetails(data);
        } else {
          console.error("API response is not an object:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching transaction details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mobileNumber]);

  // useEffect(() => {
  //   const transferData = async () => {
  //     const formData = new formData();
  //     for (const key in TransactionDetails) {
  //       formData.append(key, TransactionDetails[key]);
  //     }

  //     try {
  //       const res = await axios.post(
  //         "https://innofab.innotrat.com:8000/api/payment/",
  //         formData
  //       );

  //       console.log(res.data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };
  //   transferData();
  // }, [transactionDetails]);

  const buttonStyle = {
    backgroundColor: "primary",
    color: "white",
    marginBottom: "20px", // Reduce the margin
  };

  const closeButtonStyle = {
    position: "absolute",
    right: "8px",
    top: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Make the background slightly transparent
  };

  const cardStyle = {
    width: "45%",
    height: "70%",
    margin: "10px auto",
    position: "relative",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
  };

  const successMessageStyle = {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "28px", // Increase font size
    marginBottom: "20px", // Add space below the message
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Left-align content
  };

  const dataItemStyle = {
    fontSize: "16px",
    marginBottom: "10px",
    textAlign: "left", // Left-align text
  };

  const handleCheckStatus = (transactionId) => {
    console.log(`Checking status for transaction ID: ${transactionId}`);
  };

  const handleRefund = (transactionId) => {
    console.log(`Refunding transaction ID: ${transactionId}`);
  };

  const handleClose = () => {
    // Add a slide-out animation when closing
    navigate("/", { state: { slide: "right" } });
  };


  return (
    <Slide in={!loading} direction="up" timeout={{ enter: 500, exit: 300 }}>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Card style={cardStyle}>
              <Button
                color="error"
                style={closeButtonStyle}
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
              <CardContent style={contentStyle}>
                <Typography variant="h4" style={{ marginBottom: "20px" }}>
                  TRANSACTION DETAILS
                </Typography>
                {transactionDetails.code === "PAYMENT_SUCCESS" ? (
                  <>
                    <CheckCircleIcon
                      style={{
                        color: "green",
                        fontSize: "48px",
                        marginBottom: "20px",
                      }}
                    />
                    <Typography variant="h6" style={successMessageStyle}>
                      Payment Successful
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h6" style={successMessageStyle}>
                    {transactionDetails.code}
                  </Typography>
                )}
                <Typography style={dataItemStyle}>
                  <strong>Order Id:</strong> {transactionDetails.orderId}
                </Typography>
                <Typography style={dataItemStyle}>
                  <strong>Transaction ID:</strong>{" "}
                  {transactionDetails.transactionId}
                </Typography>
                <Typography style={dataItemStyle}>
                  <strong>Status:</strong> {transactionDetails.code}
                </Typography>
                <Typography style={dataItemStyle}>
                  <strong>Merchant ID:</strong> {transactionDetails.merchantId}
                </Typography>
                <Typography style={dataItemStyle}>
                  <strong>Amount:</strong> {transactionDetails.amount}
                </Typography>
                <Typography style={dataItemStyle}>
                  <strong>Reference ID:</strong>
                  {/* {" "} */}
                  {transactionDetails.providerReferenceId}
                </Typography>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  onClick={() =>
                    handleCheckStatus(transactionDetails.transactionId)
                  }
                >
                  Check Status
                </Button>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => handleRefund(transactionDetails.transactionId)}
                >
                  Refund
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    </Slide>
  );
};

export default TransactionDetails;
