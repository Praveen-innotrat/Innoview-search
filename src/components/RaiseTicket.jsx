import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import API_URLS from "../config";
import { LoadingButton } from "@mui/lab";

const RaiseTicketForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    specialInstructions: "",
    services: [],
  });
  const FabUrl = API_URLS.innofabapi;
  const [orderIds, setOrderIds] = useState([]); // To store the fetched order IDs

  const [errors, setErrors] = useState({
    orderId: "",
    specialInstructions: "",
  });

  useEffect(() => {
    // Fetch order IDs when the component mounts
    fetchOrderIds();
  }, []);

  const fetchOrderIds = async () => {
    try {
      const PhoneNumberValue = Cookies.get("mobile_number");
      // const PhoneNumberValue =PhoneNumberValue1.replace('+91', '')

      const response = await axios.get(
        `${FabUrl}/api/raiseticket/${PhoneNumberValue}`
      );
      // Assuming the API response is an array of order IDs
      setOrderIds(response.data.order_ids);
    } catch (error) {
      console.error("Error fetching order IDs:", error);
    }
  };
  console.log(orderIds);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };
  const handleCheckboxChange = (service) => (event) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      });
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter((item) => item !== service),
      });
    }
  };
  const validateSpecialInstructions = (instructions) => {
    const wordCount = instructions.trim().split(/\s+/).length;
    return wordCount <= 180;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      orderId: formData.orderId ? "" : "Please select an order ID",
      specialInstructions: validateSpecialInstructions(
        formData.specialInstructions
      )
        ? ""
        : "Special instructions should not exceed 180 words",
    };

    setErrors(newErrors);
    if (!formData.orderId || !formData.specialInstructions) {
      setErrors({
        ...newErrors,
        orderId: !formData.orderId ? "Please select an order ID" : "",
        specialInstructions: !formData.specialInstructions
          ? "Please enter special instructions"
          : "",
      });
      return; // Do not proceed with form submission
    }

    // If there are no errors, you can proceed with form submission
    if (!Object.values(newErrors).some((error) => error !== "")) {
      try {
        // Create a FormData object
        const formDataObj = new FormData();

        // Append the selected order ID and special instructions
        formDataObj.append("order_id", formData.orderId);
        formDataObj.append(
          "special_instructions",
          formData.specialInstructions
        );
        formData.services.forEach((service) => {
          formDataObj.append("selected_options", service);
        });

        // Perform the POST request with the FormData object
        setLoading(true);
        const response = await axios.post(
          `${FabUrl}/api/ticketsubmit/`,
          formDataObj
        );

        setLoading(false);
        const responseDataWithAppendedData = {
          ...response.data,
          appendedData: "Your appended data here",
        };
        setFormData({
          orderId: "",
          services: [],
          specialInstructions: "",
        });

        toast.success("Ticket raised successfully!");
      } catch (error) {
        toast.error(error.message);
        console.error("Error raising ticket:", error);
      }
    }
  };

  return (
    <Paper style={{ padding: "11px" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="order-id-label">Select an Order ID</InputLabel>
          <Select
            labelId="order-id-label"
            id="order-id"
            value={formData.orderId}
            onChange={handleInputChange("orderId")}
            error={!!errors.orderId}
            MenuProps={{
              style: {
                maxHeight: 250,
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {orderIds.map((orderId) => (
              <MenuItem key={orderId} value={orderId}>
                {orderId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("PCB Design")}
                onChange={handleCheckboxChange("PCB Design")}
              />
            }
            label="PCB Design"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("PCB Fabrication")}
                onChange={handleCheckboxChange("PCB Fabrication")}
              />
            }
            label="PCB Fabrication"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("Product Development")}
                onChange={handleCheckboxChange("Product Development")}
              />
            }
            label="Product Development (Embedded)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("Stencil Preparation")}
                onChange={handleCheckboxChange("Stencil Preparation")}
              />
            }
            label="Stencil Preparation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("EMS / Assembly services")}
                onChange={handleCheckboxChange("EMS / Assembly services")}
              />
            }
            label="EMS / Assembly services"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes(
                  "Testing - Certification - Services"
                )}
                onChange={handleCheckboxChange(
                  "Testing - Certification - Services"
                )}
              />
            }
            label="Testing - Certification - Services"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.services.includes("Component sourcing")}
                onChange={handleCheckboxChange("Component sourcing")}
              />
            }
            label="Component sourcing"
          />
        </div>
        <TextField
          fullWidth
          label="Special instructions (max 180 words)"
          multiline
          rows={4}
          value={formData.specialInstructions}
          onChange={handleInputChange("specialInstructions")}
          error={!!errors.specialInstructions}
          helperText={errors.specialInstructions}
        />
        {/* <Button variant="contained" color="primary" type="submit">
          Raise Ticket
        </Button> */}

        <LoadingButton
          size="large"
          // onClick={() => handleDownloadPDF(selectedOrderId)}
          // endIcon={<CiSaveDown1 />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          type="submit"
          // disabled={!isApprove}
        >
          <span> Raise Ticket</span>
        </LoadingButton>
      </form>
    </Paper>
  );
};

export default RaiseTicketForm;
