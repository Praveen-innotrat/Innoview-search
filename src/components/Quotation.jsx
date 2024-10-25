// import React, { useState, useEffect, createContext } from "react";
// import { styled } from "@mui/material/styles";
// import LoadingButton from "@mui/lab/LoadingButton";
// import { CiSaveDown1 } from "react-icons/ci";

// import TextField from "@mui/material/TextField";
// import Divider from "@mui/material/Divider";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   PDFViewer,
//   pdf,
// } from "@react-pdf/renderer";
// import CircularProgress from "@mui/material/CircularProgress";
// import Cookies from "js-cookie";
// import API_URLS from "../config";
// import { useNavigate } from "react-router";
// import { useMessage } from "./context/MessageContext";

// import axios from "axios";
// import {
//   FormControl,
//   InputLabel,
//   LinearProgress,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { toast } from "react-toastify";

// const useStyles = styled({
//   cardContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     height: "100%",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 600,
//     padding: 24,
//     borderRadius: 8,
//     backgroundColor: "#ffffff",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   textInput: {
//     marginBottom: 20,
//     fontSize: 18,
//   },
//   dateInput: {
//     marginBottom: 20,
//     fontSize: 18,
//   },
//   approveButton: {
//     marginTop: 30,
//     marginBottom: 12,
//     fontSize: 20,
//     marginRight: 20,
//     transition: "transform 0.3s",
//     "&:hover": {
//       transform: "scale(1.1)",
//     },
//   },
//   disabledButton: {
//     marginTop: 30,
//     marginBottom: 12,
//     opacity: 0.6,
//     pointerEvents: "none",
//     fontSize: 20,
//   },
// });

// const Quotation = () => {
//   const classes = useStyles();
//   const {
//     Message,
//     setMessage,
//     setAllOrderId,
//     allOrderId,

//     selectedOrderId,
//     setSelectedOrderId,
//   } = useMessage();
//   const [showQtMsg, setShowQtMsg] = useState(false);
//   const [quatationMeassage, setQuatationMessage] = useState("");
//   const [isApprove, setIsApprove] = useState(false);
//   const [pricing, setPricing] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isdownload, setIsDownload] = useState(false);
//   const [approveLoading, setApproveLoading] = useState(false);
//   const phoneNumberValue = Cookies.get("mobile_number");
//   const FabUrl = API_URLS.innofabapi;

//   const [hasOrderIds, setHasOrderIds] = useState(false);

//   const [msgLoader, setMsgLoader] = useState(false);

//   useEffect(() => {
//     quatationDetails();
//   }, [phoneNumberValue, selectedOrderId]);

//   //  useeffct for allorderid
//   useEffect(() => {
//     getAllOrderId();
//   }, []);

//   // Quatation details
//   const quatationDetails = async () => {
//     try {
//       setMsgLoader(true);
//       setQuatationMessage(null);
//       const { data } = await axios.get(
//         `${FabUrl}/api/viewquote/${phoneNumberValue}/${selectedOrderId}`
//       );
//       setMessage(data.message);
//       setIsLoading(false);
//       setMsgLoader(false);
//       setIsApprove(data.approved);
//     } catch (error) {
//       console.log("error", error);
//       setIsLoading(false);
//       setMsgLoader(false);
//     }
//   };

//   //get all order_id of a user
//   const getAllOrderId = async () => {
//     setIsLoading(true);

//     try {
//       const res = await axios.get(
//         `${FabUrl}/api/user_orders/${phoneNumberValue}`
//       );

//       setAllOrderId(res?.data?.order_id);
//       setHasOrderIds(true);

//       setIsLoading(false);
//     } catch (error) {
//       console.log("error", error);
//       setIsLoading(false);
//       setHasOrderIds(false);
//     }
//   };

//   // Quatation approve
//   const handleApprove = async () => {
//     try {
//       setApproveLoading(true);
//       const res = await axios.post(
//         `${FabUrl}/api/viewquote/${phoneNumberValue}/${selectedOrderId}/`
//       );
//       setApproveLoading(false);
//       toast.success("Quatation approved")
//       // toast.success("Quatation Approoved", { position: "top-right" });
//     } catch (error) {
//       console.log("error", error);

//       setApproveLoading(false);
//     }
//   };

//   //pdf download
//   const handleDownloadPDF = async (selectedOrderId) => {
//     setIsDownload(true);
//     if (!isApprove) {
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${FabUrl}/api/download_quotation/${phoneNumberValue}/${selectedOrderId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/pdf",
//           },
//         }
//       );

//       if (response.ok) {
//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.includes("application/pdf")) {
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const fileName = `${selectedOrderId}_quotation.pdf`;
//           const link = document.createElement("a");
//           link.href = url;
//           link.setAttribute("download", fileName);
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           setIsDownload(false);
//           toast.success("Quatation downloaded")
//         } else {
//           const data = await response.json();
//           setShowQtMsg(true);
//           setQuatationMessage(data.message || "Unexpected API response");

//         }
//       } else {
//         const data = await response.json();
//         setShowQtMsg(true);
//         setQuatationMessage(data.message || "Unexpected API response");

//       }
//     } catch (error) {
//       // console.error("Error fetching data:", error);
//       toast.error("Quatation not found")
//       setShowQtMsg(true);
//     } finally {
//       setIsDownload(false);
//     }
//   };

//   const handleChange = (e) => {
//     setSelectedOrderId(e.target.value);
//   };

//   return (
//     <div>
//       <div className={classes.card}>
//         {isLoading ? (
//           <CircularProgress />
//         ) : (
//           <>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">
//                 Select order id
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Select order id"
//                 value={selectedOrderId}
//                 onChange={handleChange}
//               >
//                 {allOrderId?.map((item, i) => (
//                   <MenuItem value={item} key={i}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {msgLoader ? (
//               <LinearProgress />
//             ) : (
//               <TextField
//                 label="Message"
//                 className={classes.textInput}
//                 value={Message}
//                 variant="outlined"
//                 fullWidth={handleApprove}
//                 InputLabelProps={{ shrink: !!Message }}
//               />
//             )}
//             {/* <LinearProgress /> */}

//             {!isApprove && hasOrderIds ? (
//               <>
//                 <LoadingButton
//                   size="large"
//                   onClick={handleApprove}
//                   loading={isApprove}
//                   loadingPosition="end"
//                   variant="contained"
//                   style={{ width: "150px", marginRight: "10px" }}
//                 >
//                   <span>Approve</span>
//                 </LoadingButton>
//               </>
//             ) : (
//               <LoadingButton
//                 size="large"
//                 loadingPosition="end"
//                 variant="contained"
//                 disabled
//                 style={{ width: "150px", marginRight: "10px" }}
//               >
//                 <span>Approve</span>
//               </LoadingButton>
//             )}

//             <LoadingButton
//               size="medium"
//               onClick={() => handleDownloadPDF(selectedOrderId)}
//               endIcon={<CiSaveDown1 />}
//               loading={isdownload}
//               loadingPosition="end"
//               variant="contained"
//             >
//               <span>Download Quotation</span>
//             </LoadingButton>
//           </>
//         )}
//       </div>

//       {showQtMsg && (
//         <div
//           style={{ fontSize: "18px", lineHeight: "2", margin: 0, padding: 0 }}
//         >
//           {quatationMeassage}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Quotation;

import React, { useState, useEffect, createContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { CiSaveDown1 } from "react-icons/ci";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import API_URLS from "../config";
import { useNavigate } from "react-router";
import { useMessage } from "./context/MessageContext";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";

const Quotation = () => {
  const {
    Message,
    setMessage,
    setAllOrderId,
    allOrderId,
    selectedOrderId,
    setSelectedOrderId,
  } = useMessage();

  const [showQtMsg, setShowQtMsg] = useState(false);
  const [quatationMeassage, setQuatationMessage] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [pricing, setPricing] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isdownload, setIsDownload] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  // const phoneNumberValue = Cookies.get("mobile_number");

  var PhoneNumber = Cookies.get("mobile_number");
  const phoneNumberValue = "+" + PhoneNumber;

  const FabUrl = API_URLS.innofabapi;
  const [hasOrderIds, setHasOrderIds] = useState(false);
  const [msgLoader, setMsgLoader] = useState(false);

  useEffect(() => {
    quatationDetails();
  }, [phoneNumberValue, selectedOrderId, approveLoading]);

  useEffect(() => {
    getAllOrderId();
  }, []);

  const quatationDetails = async () => {
    try {
      setMsgLoader(true);
      setQuatationMessage(null);
      const { data } = await axios.get(
        `${FabUrl}/api/viewquote/${phoneNumberValue}/${selectedOrderId}`
      );
      console.log("data", data);
      setMessage(data.message);
      setIsLoading(false);
      setMsgLoader(false);
      setIsApprove(data.approved);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setMsgLoader(false);
    }
  };

  const getAllOrderId = async () => {
    setIsLoading(true);
    // console.log("clicked");

    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${phoneNumberValue}`
      );

      const orderIds = res?.data?.order_id || [];
      setAllOrderId(orderIds);
      setHasOrderIds(orderIds.length > 0);
      if (orderIds.length === 0) {
        setMessage(res?.data?.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setHasOrderIds(false);
    }
  };

  // quatation approoved
  const handleApprove = async () => {
    try {
      setApproveLoading(true);
      const res = await axios.post(
        `${FabUrl}/api/viewquote/${phoneNumberValue}/${selectedOrderId}/`
      );
      setApproveLoading(false);
      toast.success("Quatation approved");
    } catch (error) {
      console.log("error", error);
      setApproveLoading(false);
    }
  };

  // quatation download
  const handleDownloadPDF = async (selectedOrderId) => {
    setIsDownload(true);
    if (!isApprove) {
      return;
    }

    try {
      const response = await fetch(
        `${FabUrl}/api/download_quotation/${phoneNumberValue}/${selectedOrderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );
      // console.log("res", response);

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/pdf")) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const fileName = `${selectedOrderId}_quotation.pdf`;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setIsDownload(false);
        } else {
          const data = await response.json();
          setShowQtMsg(true);
          setQuatationMessage(data.message || "Unexpected API response");
        }
      } else {
        const data = await response.json();
        setShowQtMsg(true);
        setQuatationMessage(data.message || "Unexpected API response");
      }
    } catch (error) {
      toast.error("Quatation not found");
      setShowQtMsg(true);
    } finally {
      setIsDownload(false);
    }
  };

  const handleChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  // console.log("isApprove", isApprove);
  // console.log("hasOrderIds", hasOrderIds);
  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full  p-2 rounded bg-white shadow-md">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {hasOrderIds && (
              <FormControl
                fullWidth
                className="mb-4"
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
            )}
            {/* message input */}
            {msgLoader ? (
              <LinearProgress />
            ) : (
              <TextField
                label="Message"
                className="mb-4 text-lg"
                value={Message}
                variant="outlined"
                fullWidth={handleApprove}
                InputLabelProps={{
                  shrink: !!Message,
                  style: { color: "blue" },
                }}
              />
            )}
            {/* approve button */}

            <LoadingButton
              size="large"
              onClick={handleApprove}
              loading={approveLoading}
              loadingPosition="end"
              variant="contained"
              disabled={
                (hasOrderIds && selectedOrderId && isApprove) ||
                Message ===
                  "Order completed. Please raise a ticket for further assistance."
              }
              style={{ width: "150px", marginRight: "10px" }}
            >
              <span>Approve</span>
            </LoadingButton>

            {/* {!isApprove && hasOrderIds && selectedOrderId ? (
              <LoadingButton
                size="large"
                onClick={handleApprove}
                loading={approveLoading}
                loadingPosition="end"
                variant="contained"
                style={{ width: "150px", marginRight: "10px" }}
              >
                <span>Approve</span>
              </LoadingButton>
            ) : (
              <LoadingButton
                size="large"
                loadingPosition="end"
                variant="contained"
                disabled
                style={{ width: "150px", marginRight: "10px" }}
              >
                <span>Approve</span>
              </LoadingButton>
            )} */}
            {/* download button */}
            <LoadingButton
              size="medium"
              onClick={() => handleDownloadPDF(selectedOrderId)}
              endIcon={<CiSaveDown1 />}
              loading={isdownload}
              loadingPosition="end"
              variant="contained"
              disabled={!isApprove}
            >
              <span>Download Quotation</span>
            </LoadingButton>
          </>
        )}
        {/* message show id if pdf is not available on a specific order */}
        {showQtMsg && (
          <div className="text-lg leading-2" style={{ margin: 0, padding: 0 }}>
            {quatationMeassage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotation;
