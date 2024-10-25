// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Typography,
//   CircularProgress,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   FormControl,
// } from "@mui/material";
// import Cookies from "js-cookie";
// import API_URLS from "../config";

// import { useMessage } from "./context/MessageContext";
// import { styled } from "@mui/system";
// import axios from "axios";

// const OrderDetails = () => {
//   const [name, setName] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [deliveryLocation, setDeliveryLocation] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [file, setFile] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const { setSelectedOrderId, selectedOrderId, allOrderId, setAllOrderId } =
//     useMessage();
//   const [loading, setLoading] = useState(false); // Added loading state

//   const [isLoading, setIsLoading] = useState(true);
//   const [hasOrderIds, setHasOrderIds] = useState(false);
//   const [dataLoader, setDataLoader] = useState(false);

//   const FabUrl = API_URLS.innofabapi;
//   const PhoneNumberValue = Cookies.get("mobile_number");

//   // const fetchData = async () => {
//   //   try {
//   //     // const PhoneNumberValue =PhoneNumberValue1.replace('+91', '')

//   //     // const response = await fetch(
//   //     //   console.log(
//   //     //     "code start"
//   //     //   )`${FabUrl}/api/vieworkorder/${PhoneNumberValue}`,
//   //     //   {
//   //     //     method: "GET",
//   //     //     headers: {
//   //     //       "Content-Type": "application/json",
//   //     //     },
//   //     //   }
//   //     // );
//   //     // console.log(response);

//   //     // console.log(response.json());

//   //     // const data = await response.json();

//   //     // setOrderData(data);
//   //     // setLoading(false);
//   //     // Data fetched, set loading to false
//   //     const { data } = await axios.get(
//   //       `${FabUrl}/api/user_orders/${PhoneNumberValue}`
//   //     );
//   //     console.log(data.order_id);
//   //     // console.log(data);
//   //     setOrderData(data?.order_id);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error("Error fetching data: ", error);
//   //     setLoading(false); // Error occurred, set loading to false
//   //   }
//   // };

//   useEffect(() => {
//     fetchData();
//   }, [selectedOrderId]);

//   useEffect(() => {
//     getAllOrderId();
//   }, []);

//   const textFieldStyles = {
//     label: {
//       color: "blue",
//       fontSize: "10px", // Label color
//     },
//     input: {
//       color: "black",
//       fontSize: "12.5px", // Text color
//       marginBottom: "15px",
//     },
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `${FabUrl}/api/vieworkorder/${PhoneNumberValue}/${selectedOrderId}`
//       );

//       setEmail(data?.user_data?.email);
//       setName(data?.user_data?.name);
//       setPhoneNo(data?.user_data?._id);
//       setDeliveryLocation(data?.user_data?.address);
//       setPincode(data?.order_data?.deliveryLocation);
//       setQuantity(data?.order_data?.quantity);
//       setFile(data?.file_data?.file_upload[0]?.originalFileName);
//       setDeliveryDate(data?.order_data?.delivery_date);
//       setLoading(false);
//     } catch (error) {
//       console.log("error", error);
//       setLoading(false);
//     }
//   };
//   const getAllOrderId = async () => {
//     setIsLoading(true);
//     setHasOrderIds(true);
//     try {
//       const res = await axios.get(
//         `${FabUrl}/api/user_orders/${PhoneNumberValue}`
//       );

//       setAllOrderId(res?.data?.order_id);

//       // const orderIds = res?.data?.order_id || [];

//       // Save orderIds in local storage
//       // localStorage.setItem("orderIds", JSON.stringify(orderIds));
//       // const storedOrderIds = JSON.parse(localStorage.getItem("orderIds")) || [];

//       // setAllOrderId(storedOrderIds);
//       // setHasOrderIds(res?.data?.order_id?.length > 0);
//       // setMessage(res?.data?.message);
//       setIsLoading(false);
//     } catch (error) {
//       console.log("error", error);
//       setIsLoading(false);
//       setHasOrderIds(false);
//     }
//   };

//   const handleChange = (event) => {
//     const newSelectedOrderId = event.target.value;
//     setSelectedOrderId(newSelectedOrderId);
//   };

//   return (
//     <Box>
//       <Card
//         sx={{ boxShadow: "none" }}
//         // style={{ backgroundColor: "red", overflowY: "hidden" }}
//       >
//         <>
//           {isLoading ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100px",
//               }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             // Render your content when loading is false
//             <>
//               <FormControl
//                 fullWidth
//                 style={{ marginTop: "20px", marginBottom: "15px" }}
//               >
//                 <InputLabel id="demo-simple-select-label">
//                   Select order id
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={selectedOrderId}
//                   label="Select order id"
//                   onChange={handleChange}

//                 >
//                   {allOrderId?.map((item, i) => (
//                     <MenuItem value={item} key={i}  >
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {loading ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100px",
//                   }}
//                 >
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Customer Username"
//                         value={name}
//                         InputLabelProps={{ style: textFieldStyles.label }}
//                         InputProps={{ style: textFieldStyles.input }}
//                         fullWidth
//                         style={{ marginTop: "5px" }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Customer Phone Number"
//                         value={phoneNo}
//                         fullWidth
//                         InputLabelProps={{ style: textFieldStyles.label }}
//                         InputProps={{ style: textFieldStyles.input }}
//                       />
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Email ID"
//                         value={email}
//                         fullWidth
//                         InputLabelProps={{ style: textFieldStyles.label }}
//                         InputProps={{ style: textFieldStyles.input }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Gerber File Zip Uploaded"
//                         value={file}
//                         fullWidth
//                         InputLabelProps={{ style: textFieldStyles.label }}
//                         InputProps={{ style: textFieldStyles.input }}
//                       />
//                     </Grid>
//                   </Grid>
//                   <TextField
//                     label="Expected Delivery Date"
//                     value={deliveryDate}
//                     fullWidth
//                     InputLabelProps={{ style: textFieldStyles.label }}
//                     InputProps={{ style: textFieldStyles.input }}
//                   />
//                   <TextField
//                     label="Quantity"
//                     value={quantity}
//                     fullWidth
//                     InputLabelProps={{ style: textFieldStyles.label }}
//                     InputProps={{ style: textFieldStyles.input }}
//                   />
//                   <TextField
//                     label="Delivery Location"
//                     value={deliveryLocation}
//                     fullWidth
//                     InputLabelProps={{ style: textFieldStyles.label }}
//                     InputProps={{ style: textFieldStyles.input }}
//                   />
//                   <TextField
//                     label="Pin Code"
//                     value={pincode}
//                     fullWidth
//                     InputLabelProps={{ style: textFieldStyles.label }}
//                     InputProps={{ style: textFieldStyles.input }}
//                   />
//                 </>
//               )}
//             </>
//           )}
//         </>
//       </Card>
//     </Box>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  FormControl,
} from "@mui/material";
import Cookies from "js-cookie";
import API_URLS from "../config";

import { useMessage } from "./context/MessageContext";
import { styled } from "@mui/system";
import axios from "axios";

const OrderDetails = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const { setSelectedOrderId, selectedOrderId, allOrderId, setAllOrderId } =
    useMessage();
  const [loading, setLoading] = useState(false); // Added loading state

  const [isLoading, setIsLoading] = useState(true);
  const [hasOrderIds, setHasOrderIds] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);

  const FabUrl = API_URLS.innofabapi;
  var PhoneNumber = Cookies.get("mobile_number");
  const PhoneNumberValue = "+" + PhoneNumber;
  // const fetchData = async () => {
  //   try {
  //     // const PhoneNumberValue =PhoneNumberValue1.replace('+91', '')

  //     // const response = await fetch(
  //     //   console.log(
  //     //     "code start"
  //     //   )`${FabUrl}/api/vieworkorder/${PhoneNumberValue}`,
  //     //   {
  //     //     method: "GET",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //   }
  //     // );
  //     // console.log(response);

  //     // console.log(response.json());

  //     // const data = await response.json();

  //     // setOrderData(data);
  //     // setLoading(false);
  //     // Data fetched, set loading to false
  //     const { data } = await axios.get(
  //       `${FabUrl}/api/user_orders/${PhoneNumberValue}`
  //     );
  //     console.log(data.order_id);
  //     // console.log(data);
  //     setOrderData(data?.order_id);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     setLoading(false); // Error occurred, set loading to false
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, [selectedOrderId]);

  useEffect(() => {
    getAllOrderId();
  }, []);

  const textFieldStyles = {
    label: {
      color: "blue",
      fontSize: "10px", // Label color
    },
    input: {
      color: "black",
      fontSize: "12.5px", // Text color
      marginBottom: "15px",
    },
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${FabUrl}/api/vieworkorder/${PhoneNumberValue}/${selectedOrderId}`
      );

      setEmail(data?.user_data?.email);
      setName(data?.user_data?.name);
      setPhoneNo(data?.user_data?._id);
      setDeliveryLocation(data?.user_data?.address);
      setPincode(data?.order_data?.deliveryLocation);
      setQuantity(data?.order_data?.quantity);
      setFile(data?.file_data?.file_upload[0]?.originalFileName);
      setDeliveryDate(data?.order_data?.delivery_date);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const getAllOrderId = async () => {
    setIsLoading(true);
    setHasOrderIds(true);
    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${PhoneNumberValue}`
      );

      setAllOrderId(res?.data?.order_id);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setHasOrderIds(false);
    }
  };

  const handleChange = (event) => {
    const newSelectedOrderId = event.target.value;
    setSelectedOrderId(newSelectedOrderId);
  };

  return (
    <Box>
      <Card sx={{ boxShadow: "none" }}>
        <>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            // Render your content when loading is false
            <>
              <FormControl
                fullWidth
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select order id
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOrderId}
                  label="Select order id"
                  onChange={handleChange}
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

              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="filled-basic"
                        label="Customer Username"
                        value={name}
                        InputLabelProps={{ style: textFieldStyles.label }}
                        InputProps={{ style: textFieldStyles.input }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Customer Phone Number"
                        value={phoneNo}
                        fullWidth
                        InputLabelProps={{ style: textFieldStyles.label }}
                        InputProps={{ style: textFieldStyles.input }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email ID"
                        value={email}
                        fullWidth
                        style={{ cursor: "none" }}
                        InputLabelProps={{ style: textFieldStyles.label }}
                        InputProps={{ style: textFieldStyles.input }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Gerber File Zip Uploaded"
                        value={file}
                        fullWidth
                        InputLabelProps={{ style: textFieldStyles.label }}
                        InputProps={{ style: textFieldStyles.input }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Expected Delivery Date"
                    value={deliveryDate}
                    fullWidth
                    InputLabelProps={{ style: textFieldStyles.label }}
                    InputProps={{ style: textFieldStyles.input }}
                  />
                  <TextField
                    label="Quantity"
                    value={quantity}
                    fullWidth
                    InputLabelProps={{ style: textFieldStyles.label }}
                    InputProps={{ style: textFieldStyles.input }}
                  />
                  <TextField
                    label="Delivery Location"
                    value={deliveryLocation}
                    fullWidth
                    InputLabelProps={{ style: textFieldStyles.label }}
                    InputProps={{ style: textFieldStyles.input }}
                  />
                  <TextField
                    label="Pin Code"
                    value={pincode}
                    fullWidth
                    InputLabelProps={{ style: textFieldStyles.label }}
                    InputProps={{ style: textFieldStyles.input }}
                  />
                </>
              )}
            </>
          )}
        </>
      </Card>
    </Box>
  );
};

export default OrderDetails;
