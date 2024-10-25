import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import API_URLS from "../config";
import axios from "axios";
import {
  useMessage,
  setAllOrderId,
  setSelectedOrderId,
} from "./context/MessageContext";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const Payment = () => {
  const { setSelectedOrderId, selectedOrderId, allOrderId, setAllOrderId } =
    useMessage();
  const [paymentInitiate, setPaymentInitiate] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quotationDate, setQuotationDate] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasOrderId, setHasOrderId] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentStatusMsg, setPaymentStatusMsg] = useState("");
  const [transition_Id, setTransition_Id] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const FabUrl = API_URLS.innofabapi;

  // const PhoneNumberValue = Cookies.get("mobile_number");
  var PhoneNumber = Cookies.get("mobile_number");
  const PhoneNumberValue = "+" + PhoneNumber;
  // const PhoneNumberValue =PhoneNumberValue1.replace('+91', '')

  useEffect(() => {
    paymentDetails();
  }, [selectedOrderId]);

  useEffect(() => {
    getAllOrderId();
  }, [PhoneNumberValue]);

  const paymentDetails = async () => {
    try {
      setIsPaymentLoading(true);
      const res = await axios.get(
        `${FabUrl}/api/viewpi/${PhoneNumberValue}/${selectedOrderId}`
      );

      setTotalAmount(res.data.price);
      setPaymentStatusMsg(res?.data?.message);
      setTransition_Id(res?.data?.transaction_id);
      setPaymentDate(res?.data?.date_time);

      // Calculate the date for the Quotation valid till field (+2 day from the current date)
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      const formattedDate = currentDate.toISOString().split("T")[0];
      setQuotationDate(formattedDate);
      setIsPaymentLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsPaymentLoading(false);
    }
  };

  const getAllOrderId = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${PhoneNumberValue}`
      );

      const orderIds = res?.data?.order_id || [];
      setAllOrderId(orderIds);
      setHasOrderId(orderIds.length > 0);
      if (orderIds.length === 0) {
        setMessage(res?.data?.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setHasOrderId(false);
    }
  };

  const handleCheckout = async (amount) => {
    try {
      setLoading(true);

      const payload = {
        amount: amount, // Pass the payment amount
        PhoneNumber: PhoneNumberValue,
        orderId: selectedOrderId,
      };
      // console.log("payload", payload);
      const Payment = API_URLS.payment;
      // Make a POST request to the /initiate-payment API

      const response = await axios.post(
        `${Payment}/initiate-payment/`,
        payload
      );
      console.log(response);
      // Extract the data from the response
      const responseData = response.data;

      // Redirect to the PhonePe payment page if needed
      if (responseData && responseData.url) {
        window.location.href = responseData.url;
      } else {
        // console.error("URL not found in the response");
        // alert("URL not found in the response. Please try again later.");
        toast.error("URL not found in the response. Please try again later.");
      }
      //       setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  // console.log("selectOrderId", selectedOrderId);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {isLoading ? (
        <CircularProgress /> // Display CircularProgress while loading
      ) : (
        <Card variant="outlined" style={{ width: "400px" }}>
          <CardContent>
            {/* {allOrderId && <SelectOrderId />} */}

            {hasOrderId ? (
              <FormControl
                fullWidth
                sx={{
                  ".MuiInputLabel-root": {
                    color: "blue",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select order id
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select order id"
                  value={selectedOrderId}
                  onChange={handleChange}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
                    },
                  }}
                >
                  {allOrderId?.map((item, i) => (
                    <MenuItem value={item} key={i}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label="Message"
                className="mb-4 text-lg"
                value={message}
                variant="outlined"
                fullWidth={!hasOrderId}
                InputLabelProps={{ shrink: !!message }}
              />
            )}

            {isPaymentLoading ? (
              <CircularProgress />
            ) : (
              <>
                {hasOrderId ? (
                  <>
                    {totalAmount === null ? (
                      <div className="flex flex-col mt-2">
                        <TextField
                          label="Message"
                          className="mb-4 text-lg"
                          value={paymentStatusMsg}
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: "blue" },
                          }}
                        />
                        <TextField
                          label="Transaction_id"
                          className="mb-4 text-lg"
                          value={transition_Id}
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: "blue" },
                          }}
                        />
                        <TextField
                          label="Payment Date"
                          className="mb-4 text-lg"
                          value={paymentDate}
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: "blue" },
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <Typography variant="h5" gutterBottom>
                          Total amount to pay
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          {totalAmount}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                          Quotation valid till
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {quotationDate}
                        </Typography>
                        <LoadingButton
                          size="large"
                          onClick={() => handleCheckout(totalAmount)}
                          loadingPosition="end"
                          loading={loading}
                          variant="contained"
                          disabled={paymentInitiate}
                        >
                          <span>Payment</span>
                        </LoadingButton>
                      </div>
                    )}
                  </>
                ) : (
                  <LoadingButton size="large" variant="contained" disabled>
                    <span>Payment</span>
                  </LoadingButton>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Payment;
