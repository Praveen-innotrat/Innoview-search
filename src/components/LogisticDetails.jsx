import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "../config";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  LinearProgress,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMessage } from "./context/MessageContext";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const LogisticDetails = () => {
  const [logisticDetails, setLogisticDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [docket_id, setDocket_id] = useState(null);
  const [courierName, setCourierName] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [logisticMsg, setLogisticMsg] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [hasOrderIds, setHasOrderIds] = useState(false);

  const [orderMsg, setOrderMsg] = useState("");

  var PhoneNumber = Cookies.get("mobile_number");
  const PhoneNumberValue = "+" + PhoneNumber;
  // const FabUrl = API_URLS.innofabapi;
  const FabUrl = API_URLS.innofabapi;
  const {
    setAllOrderId,
    allOrderId,
    selectOrderId,
    selectedOrderId,
    setSelectedOrderId,
  } = useMessage();

  useEffect(() => {
    getAllOrderId();
  }, []);

  const handleTrackingLinkClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${FabUrl}/api/trackshipment/${PhoneNumberValue}/${selectedOrderId}`
      );
      const tranckingCode = parseInt(res?.data?.status);

      setLogisticDetails(true);
      setCourierName(res?.data?.courier_name);
      setDocket_id(res?.data?.docket_id);
      setArrivalDate(res?.data?.date_of_arrival);
      setTrackingUrl(res?.data?.trackink_url);
      setStatusCode(tranckingCode);
      setLogisticMsg(res?.data?.message);
      // console.log("trackingcode:", typeof tranckingCode);
      switch (tranckingCode) {
        case 1: {
          setOrderMsg("Order Recived");
          break;
        }
        case 2: {
          setOrderMsg("Shipment Booked");
          break;
        }
        case 3: {
          setOrderMsg("Shipment on Deliver");
          break;
        }
        case 4: {
          setOrderMsg("Order Deliverd");
          break;
        }
        default: {
          setOrderMsg("default msg");
          break;
        }
      }

      toast.success("tracking details updated sucessfully");

      // console.log("orderMsg", orderMsg);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.Message);
      setIsLoading(false);
    }
  };

  //get all order_id of a user
  const getAllOrderId = async () => {
    setLoading(true);
    setHasOrderIds(true);
    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${PhoneNumberValue}`
      );

      setAllOrderId(res?.data?.order_id);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setHasOrderIds(false);
    }
  };
  const handleChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  return (
    <Card>
      {loading ? (
        // Render a loading indicator while fetching data
        <CardContent
          style={{
            display: "flex",
            padding: "17px",

            // height: "100px",
          }}
        >
          <CircularProgress color="primary" />
        </CardContent>
      ) : (
        <CardContent>
          <FormControl
            fullWidth
            sx={{
              ".MuiInputLabel-root": {
                color: "blue",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Select an Order Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Docket Number"
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

          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            onClick={handleTrackingLinkClick}
            variant="contained"
          >
            Track Shipment
          </LoadingButton>

          {logisticDetails &&
            (logisticMsg ? (
              <TextField
                label="LogisticMsg"
                value={logisticMsg}
                fullWidth
                sx={{ marginBottom: "1rem", marginTop: "15px" }}
              />
            ) : (
              <>
                {!isLoading && (
                  <div className="flex flex-col mt-4">
                    <>
                      <TextField
                        label="Docket_id"
                        value={docket_id}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          style: { color: "blue" },
                        }}
                      />
                      <TextField
                        label="Courier_name"
                        value={courierName}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          style: { color: "blue" },
                        }}
                      />
                      <TextField
                        label="Tracking_url"
                        value={trackingUrl}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          style: { color: "blue" },
                        }}
                      />

                      <TextField
                        label="Date_of_arrival"
                        value={arrivalDate}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          style: { color: "blue" },
                        }}
                      />
                      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                        Status:<span className="ml-4 text-2xl">{orderMsg}</span>
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={statusCode * 25}
                        // style={{ backgroundColor: "red" }}
                      />
                    </>
                  </div>
                )}
              </>
            ))}
        </CardContent>
      )}
    </Card>
  );
};

export default LogisticDetails;
