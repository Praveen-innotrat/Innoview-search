import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { Download, CheckCircle, Warning } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "../config";
import CircularProgress from "@mui/material/CircularProgress";
import { useMessage } from "./context/MessageContext";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const TaxInvoice = () => {
  const [invoiceMsg, setInvoiceMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [msgLoading, setMsgLoading] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fabricationStatus, setFabricationStatus] = useState("");

  const [taxInvoiceMeassage, setTaxInvoiceMessage] = useState("");
  const [showQtMsg, setShowQtMsg] = useState(false);
  const [hasOrderId, setHasOrderId] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  // const PhoneNumberValue = Cookies.get("mobile_number");
  var PhoneNumber = Cookies.get("mobile_number");
  const PhoneNumberValue = "+" + PhoneNumber;
  const FabUrl = API_URLS.innofabapi;

  const {
    Message,
    selectOrderId,
    allOrderId,
    setAllOrderId,
    selectedOrderId,
    setMessage,
    setSelectedOrderId,
  } = useMessage();

  const apiUrl = `${FabUrl}/api/viewinvoice/${PhoneNumberValue}/${selectedOrderId}`;

  //get all order_id of a user
  const getAllOrderId = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${PhoneNumberValue}/`
      );

      const orderIds = res?.data?.order_id || [];

      setAllOrderId(orderIds);

      setMessage(res?.data?.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //taxinvoice details for specific order
  const fetchData = async () => {
    try {
      setMsgLoading(true);
      const response = await axios.get(apiUrl);
      console.log("response", response);

      setInvoiceMsg(response?.data?.message);
      const Tax_status = response?.data?.status;

      const date = response?.data.tax_data?.delivery_date;
      setInvoiceStatus(Tax_status);
      setDeliveryDate(date);

      const contentType = response.headers["content-type"];

      if (contentType == "application/json") {
        setHasFile(false);
      } else if (contentType == "application/pdf") {
        setHasFile(true);
      }

      // Set fabrication status based on the message property
      if (Tax_status === "Quotation approved") {
        setFabricationStatus("Fabrication is under process");
      } else {
        setFabricationStatus("Fabrication on hold");
      }
      setMsgLoading(false);

      setHasOrderId(response.data?.order_id?.length > 0);
    } catch (error) {
      toast.error(error.message);
      setMsgLoading(false);

      setInvoiceStatus(null);
      setDeliveryDate("");
      setFabricationStatus("");
      setHasOrderId(false);
    }
  };

  // Taxinvoice download for specific order
  const handleDownloadInvoice = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${FabUrl}/api/viewinvoice/${PhoneNumberValue}/${selectedOrderId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );
      // console.log("response", response);

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        console.log("content-type", contentType);

        if (contentType && contentType.includes("application/pdf")) {
          console.log("enter");
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          console.log("url", url);
          const fileName = `${selectedOrderId}_Taxinvoice.pdf`;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setLoading(false);
          // selectedOrderId(null);
        } else {
          const data = await response.json();
          console.log("data", data);

          setShowQtMsg(true);
          setTaxInvoiceMessage(data.message || "Unexpected API response");
        }
      } else {
        const data = await response.json();
        console.log("data", data);
        setShowQtMsg(true);
        setTaxInvoiceMessage(data.message || "Unexpected API response");
      }
    } catch (error) {
      toast.error(error.message);
      setShowQtMsg(true);
      setTaxInvoiceMessage("Error fetching data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOrderId]);

  useEffect(() => {
    getAllOrderId();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card style={{ width: "450px", padding: "10px" }}>
          <CardContent style={{ cursor: "pointer" }}>
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
                autoFocus
                MenuProps={{
                  style: {
                    maxHeight: 300,
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

            {msgLoading ? (
              <CircularProgress />
            ) : (
              <>
                {!hasFile && (
                  <>
                    {invoiceMsg ===
                    "Order completed. Please raise a ticket for further assistance." ? (
                      <TextField
                        id="outlined-basic"
                        label="Invoice Message"
                        variant="outlined"
                        value={invoiceMsg}
                        fullWidth
                        InputLabelProps={{
                          style: { color: "blue" },
                        }}
                      />
                    ) : (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Invoice Message"
                          variant="outlined"
                          value={invoiceMsg}
                          fullWidth
                          InputLabelProps={{
                            style: { color: "blue" },
                          }}
                          className="mt-20"
                        />

                        <TextField
                          id="outlined-basic"
                          label="Delivery Date"
                          variant="outlined"
                          value={deliveryDate}
                          fullWidth
                          InputLabelProps={{
                            style: { color: "blue" },
                          }}
                        />
                      </>
                    )}
                  </>
                )}

                {!hasFile ? (
                  <div className="flex  text-green-700 gap-1">
                    <>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ fontSize: "20px" }}
                      >
                        {invoiceStatus}
                      </Typography>
                      {invoiceStatus && (
                        <div className="flex items-center mb-1">
                          <CheckCircle
                            style={{
                              fontSize: "20px",
                              color: "green",
                            }}
                          />
                        </div>
                      )}
                    </>
                  </div>
                ) : (
                  <LoadingButton
                    size="large"
                    startIcon={<Download style={{ fontSize: 20 }} />}
                    onClick={handleDownloadInvoice}
                    loadingPosition="end"
                    loading={loading}
                    variant="contained"
                    className="float-right"
                  >
                    <span>Download</span>
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

export default TaxInvoice;
