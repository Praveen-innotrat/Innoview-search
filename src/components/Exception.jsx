import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "../config";

import { useMessage } from "./context/MessageContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import styled from "styled-components";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Exception = () => {
  const [status, setStatus] = useState("Fabrication on progress");
  const [statusCode, setStatusCode] = useState("");
  const [exceptionType, setExceptionType] = useState("");

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exceptionLoading, setExceptionLoading] = useState(false);
  const [approve, setApprove] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [specialInstruction, setSpecialInstruction] = useState(""); // New state for Special Instruction
  const [File, setFile] = useState(null); // New state for uploaded file
  const [specialInstructionError, setSpecialInstructionError] = useState(""); // Special Instruction validation error
  const [fileError, setFileError] = useState(""); // File upload validation error
  const [hasOrderIds, setHasOrderIds] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [exceptionMsg, setExceptionMsg] = useState(false);
  const [ManualUpload, setManualUpload] = useState(false);
  const [updateFile, setUpdateFile] = useState(false);

  const {
    selectedOrderId,
    setSelectedOrderId,
    allOrderId,
    setAllOrderId,
    Message,
    setMessage,
  } = useMessage();

  const FabUrl = API_URLS.innofabapi;

  var PhoneNumber = Cookies.get("mobile_number");
  const PhoneNumberValue = "+" + PhoneNumber;

  const apiUrl = `${FabUrl}/api/exceptions/${PhoneNumberValue}`;
  const statusUrl = `${FabUrl}/api/order_progress_status/${PhoneNumberValue}`;

  // exception detail
  useEffect(() => {
    exceptionDeatils();
  }, [PhoneNumberValue, selectedOrderId, approve]);

  // update fabrication
  useEffect(() => {
    updateFabricationStatus();
  }, [selectedOrderId, statusCode]);
  // get all orderId
  useEffect(() => {
    getAllOrderId();
  }, []);

  // update fabrication status
  const updateFabricationStatus = async () => {
    setStatus("");
    try {
      setExceptionLoading(true);
      const res = await axios.get(`${statusUrl}/${selectedOrderId}/`);
      // console.log("res", res.data);

      setStatusCode(res?.data?.order_status);
      switch (statusCode) {
        case 0: {
          setStatus("Order placed");
          break;
        }
        case 1: {
          setStatus("Quatation approved");
          break;
        }
        case 2: {
          setStatus("Payment sucess");
          break;
        }
        case 3: {
          setStatus("Fabrication going on");
          break;
        }
        case 4: {
          setStatus("Exception found");
          break;
        }
        case 5: {
          setStatus("Exception evaluation");
          break;
        }
        case 6: {
          setStatus("Order dispatched");
          break;
        }
        case 7: {
          setStatus("Order delivered");
        }
      }
      // console.log("statuscode", statusCode);
      setExceptionLoading(false);
    } catch (error) {
      toast.error(error.message);
      setExceptionLoading(false);
    }
  };
  //get all order_id of a user
  const getAllOrderId = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${FabUrl}/api/user_orders/${PhoneNumberValue}`
      );

      setAllOrderId(res?.data?.order_id);
      // setHasOrderIds(true);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      // setHasOrderIds(false);
    }
  };

  // get exception details for user
  const exceptionDeatils = async () => {
    try {
      setStatus("");
      setExceptionType(null);
      setExceptionLoading(true);
      setExceptionMsg(null);

      const res = await axios.get(
        `${FabUrl}/api/approve_exception/${PhoneNumberValue}/${selectedOrderId}/`
      );

      setIsApprove(res.data.approved);
      setExceptionType(res.data.message);
      const content_Type = res.headers["content-type"];
      if (content_Type === "application/pdf") {
        setExceptionLoading(false);
        return;
      }
      setExceptionLoading(false);
    } catch (error) {
      setExceptionLoading(false);
      console.log("error", error);
    }
  };

  //Exception Approved
  const handleApproveException = async () => {
    try {
      setApprove(true);
      const res = await axios.post(
        `${FabUrl}/api/approve_exception/${PhoneNumberValue}/${selectedOrderId}/`
      );
      // console.log("res", res);
      setApprove(false);
      toast.success("exception approoved ");
    } catch (error) {
      console.log("error", error);
      setApprove(false);
      toast.error(error.Message);
    }
  };

  // exception file download
  const handleDownloadExceptionFile = async () => {
    try {
      setIsDownload(true);

      const response = await axios.get(
        `${FabUrl}/api/download_exception/${PhoneNumberValue}/${selectedOrderId}/`
      );
      console.log("res", response);

      const pdfUrl = response?.data;

      const contentType = response.headers.get("Content-Type");

      if (contentType === "application/pdf") {
        setHasFile(true);

        const blob = new Blob([pdfUrl], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);

        const fileName = `${selectedOrderId}_exception`;
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", fileName);
        link.click();
        setIsDownload(false);

        return;
      } else {
        setHasFile(false);
        setExceptionMsg(true);
        setMessage(response?.data?.message);
        setIsDownload(false);

        return;
      }
    } catch (error) {
      toast.error(error.message);
      setIsDownload(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    // Validate Special Instruction
    if (!specialInstruction) {
      toast.error(" specialInstruction can't be empty");
      return;
    }

    // Validate File Upload
    if (!File) {
      toast.error("please upload file before submit");
      return;
    }

    const formData = new FormData();

    formData.append("exception_type", specialInstruction);
    formData.append("uploaded_exception", File);

    try {
      setManualUpload(true);
      const res = await axios.post(`${apiUrl}/${selectedOrderId}/`, formData);
      console.log("res", res);
      toast.success("exception file upload sucessfully");
      setHasFile(false);
      setManualUpload(false);
      setSpecialInstruction("");
    } catch (error) {
      toast.error(error.message);
      setManualUpload(false);
    }
  };

  const openPopover = () => setIsPopoverOpen(true);
  const closePopover = () => {
    setIsPopoverOpen(false);
    setUploadSuccess(false);
    setSpecialInstruction(""); // Clear the Special Instruction field
    setFile(null); // Clear the selected file
    setSpecialInstructionError(""); // Clear Special Instruction error
    setFileError(""); // Clear File upload error
  };

  const handleInstruction = (e) => {
    console.log("e", e.target.value);
    setSpecialInstruction(e.target.value);
  };

  const PopoverContent = () => {
    return (
      <>
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", textAlign: "center" }}
        >
          Exception Upload
          <IconButton
            onClick={closePopover}
            style={{ alignItems: "flex-end", padding: "10px" }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Typography>

        <div className="flex flex-col items-end p-3">
          <TextField
            id="outlined-basic"
            label="specialInstruction"
            variant="outlined"
            value={selectedOrderId}
            autoFocus
            fullWidth
            className="mt-3"
            required
          />
          <TextField
            id="outlined-basic"
            label="specialInstruction"
            variant="outlined"
            value={specialInstruction}
            onChange={handleInstruction}
            autoFocus
            fullWidth
            className="mt-3"
            required
          />

          <Button
            variant="contained"
            startIcon={<BackupIcon />}
            type="file"
            sx={{ mt: 2, gap: "10px" }}
            component={"span"}
          >
            Upload Design
            <input
              type="file"
              accept=".pdf"
              key="fileInput"
              onChange={handleFileChange}
            />
          </Button>

          <LoadingButton
            size="sm"
            loadingPosition="end"
            loading={ManualUpload}
            variant="contained"
            className="float-right mt-2"
            onClick={handleSubmit}
          >
            <span>Submit</span>
          </LoadingButton>
        </div>
      </>
    );
  };

  const handleChange = (e) => {
    setSelectedOrderId(e.target.value);
  };

  const popoverContent = <PopoverContent />;

  return (
    <div style={{ margin: "30px", gap: "20px" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {selectedOrderId && (
            <div className="mb-5 flex  justify-start items-center">
              <Typography
                variant="h6"
                sx={{
                  color: status === "Fabrication on hold" ? "red" : "green",
                  fontSize: "20px",
                }}
              >
                {status}
              </Typography>
              <IconButton>
                {status === "Fabrication on hold" ? (
                  <ErrorIcon sx={{ color: "red" }} />
                ) : (
                  <>
                    {!exceptionLoading && (
                      <CheckCircleIcon
                        sx={{ color: "green", fontSize: "20px" }}
                      />
                    )}
                  </>
                )}
              </IconButton>
            </div>
          )}

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
          {exceptionLoading ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                label="Exception Type"
                variant="outlined"
                value={exceptionType}
                fullWidth
                autoFocus
                InputLabelProps={{
                  shrink: Boolean(exceptionType || File),
                  style: { color: "blue" }, // Shrink label if there is a value in specialInstruction or File
                }}
              />

              <div className="flex mb-5">
                {/* approve btn */}
                <LoadingButton
                  size="large"
                  onClick={handleApproveException}
                  loadingPosition="end"
                  loading={approve}
                  variant="contained"
                  disabled={
                    isApprove ||
                    exceptionType ===
                      "Exception data not found for the user." ||
                    !selectedOrderId ||
                    exceptionType ===
                      "Order completed. Please raise a ticket for further assistance."
                  }
                  className="w-[150px]"
                >
                  <span>Approve</span>
                </LoadingButton>

                {/* download btn */}
                <LoadingButton
                  size="large"
                  onClick={handleDownloadExceptionFile}
                  loadingPosition="end"
                  loading={isDownload}
                  variant="contained"
                  disabled={!isApprove || status === "Order delivered"}
                  className="w-[150px] mx-2"
                >
                  <span>Download</span>
                </LoadingButton>
                {/* upload btn */}
                <Button
                  variant="contained"
                  disabled={!hasFile || !isApprove}
                  onClick={openPopover}
                  style={{ padding: "10px 35px" }}
                >
                  New Upload
                </Button>
              </div>
              {exceptionMsg && (
                <div
                  className="text-xl leading-2 font-bold"
                  style={{ margin: 0, padding: 0, fontWeight: "100" }}
                >
                  {Message}
                </div>
              )}

              <Popover
                open={isPopoverOpen}
                anchorEl={isPopoverOpen}
                onClose={closePopover}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {popoverContent}
              </Popover>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Exception;
