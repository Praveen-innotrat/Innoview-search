import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BackupIcon from "@mui/icons-material/Backup";
import CombinedToast from "./combinedToast";
import Cookies from "js-cookie";
import Navbar from "./layout-components/Navbar";
import Footer from "./layout-components/StickyFooter";
import API_URLS from "../config";
import Header from "./Header/Header";

const UserRequirementsForm = () => {
  useEffect(() => {
    toast.options = {
      positionClass: "toast-bottom-center",
      closeButton: true,
    };
  }, []);
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91"); // Add country code state
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Validation patterns
  const phoneRegExp = /^\+?\d{10}$/;
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pincodeRegExp = /^\d{6}$/;
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    calculateExpectedDeliveryDate()
  );
  const FabUrl = API_URLS.innofabapi;
  const baseUrl = API_URLS.base;
  // State to store form values and validation errors
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    file: null,
    quantity: "",
    deliveryLocation: "",
    address: "",
    landmark: "",
    specialInstructions: "",
    domCheck: false,
    sourcebom: false,
    makeStencil: false,
    assemblyService: false,
    testingService: false,
    certificationCallback: false,
    firmwareDevelopment: false,
    boxBuilding: false,
  });
  function calculateExpectedDeliveryDate() {
    const today = new Date();
    const fourDaysLater = new Date(today);
    fourDaysLater.setDate(today.getDate() + 4);
    const formattedDate = fourDaysLater.toISOString().slice(0, 10);
    return formattedDate;
  }

  const [formErrors, setFormErrors] = useState({
    phoneNumber: "",
    email: "",
    deliveryLocation: "",
    quantity: "",
  });

  const mobileNumberFromCookies1 = Cookies.get("mobile_number");
  const mobileNumberFromCookies = mobileNumberFromCookies1
    ? mobileNumberFromCookies1.replace("91", "")
    : "";
  useEffect(() => {
    toast.options = {
      positionClass: "toast-bottom-center",
      closeButton: true,
    };

    // Set the mobile number as the default value for the phone number field
    setFormData({
      ...formData,
      phoneNumber: mobileNumberFromCookies || "",
    });
  }, []);
  const handlePhoneNumberChange = (event) => {
    // Call handleChange to perform common handling
    handleChange(event);

    // Additional handling specific to phone number
    const { name, value } = event.target;

    if (name === "phoneNumber") {
      const phoneNumber = value;
      setFormErrors({
        ...formErrors,
        phoneNumber:
          phoneNumber && !phoneRegExp.test(phoneNumber)
            ? "Invalid phone number"
            : "",
      });
    }
  };

  const checkUserExists = async (event) => {
    event.preventDefault();
    try {
      const phoneNumbercode = `${countryCode + formData.phoneNumber}`;

      const response = await axios.get(
        `${baseUrl}/check_user_all?mobile_number=91${formData.phoneNumber}`
      );

      console.log("res", response);
      if (response.data.success) {
        // User is registered, you can proceed with form submission
        handleSubmit(event);
      } else {
        // User is not registered, show a notification to sign up
        toast.error(
          "Your phone number are not registered. Please sign up and then submit the gerber Design."
        );
        navigate("/sign-up");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error checking user existence:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Handler to update form values
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Basic field validation
    if (name === "phoneNumber") {
      setFormErrors({
        ...formErrors,
        phoneNumber:
          value && !phoneRegExp.test(value) ? "Invalid phone number" : "",
      });
    } else if (name === "email") {
      setFormErrors({
        ...formErrors,
        email: value && !emailRegExp.test(value) ? "Invalid email address" : "",
      });
    } else if (name === "deliveryLocation") {
      setFormErrors({
        ...formErrors,
        deliveryLocation:
          value && !pincodeRegExp.test(value) ? "Invalid pincode" : "",
      });
    } else if (name === "quantity") {
      setFormErrors({
        ...formErrors,
        quantity:
          value && Number(value) <= 0
            ? "Quantity should be greater than zero"
            : "",
      });
    }
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked, // Update checkbox value
      });
    } else {
      // If not a checkbox, update as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handler to update the file input value
  const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

  // Handler to update the BOM input value
  const handleBOMChange = (event) => {
    setFormData({ ...formData, bomFile: event.target.files[0] });
  };
  const getSelectedCheckboxes = () => {
    const selectedCheckboxes = {};
    for (const key in formData) {
      if (formData[key] === true && key !== "domCheck") {
        selectedCheckboxes[key] = formData[key];
      }
    }
    return selectedCheckboxes;
  };

  // Handler to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for form errors before submitting
    if (
      formErrors.phoneNumber ||
      formErrors.email ||
      formErrors.deliveryLocation ||
      formErrors.quantity
    ) {
      return;
    }
    setLoading(true);
    setLoadingMessage("Your form is submitting, please wait..."); // Parse the response body as JSON
    const selectedCheckboxes = getSelectedCheckboxes();

    const postData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      quantity: formData.quantity,
      file: formData.file.name,
      expectedDeliveryDate: expectedDeliveryDate,
      deliveryLocation: formData.deliveryLocation,
      address: formData.address,
      landmark: formData.landmark,
      specialInstructions: formData.specialInstructions,
      domCheck: formData.domCheck,
      sourcebom: formData.sourcebom,
      makeStencil: formData.makeStencil,
      assemblyService: formData.assemblyService,
      testingService: formData.testingService,
      certificationCallback: formData.certificationCallback,
      firmwareDevelopment: formData.firmwareDevelopment,
      boxBuilding: formData.boxBuilding,
      // ...selectedCheckboxes,
      services: Object.keys(selectedCheckboxes),
      // selected_boxes: selectedCheckboxes,
    };
    const NewformData = new FormData();

    NewformData.append("name", formData.name);
    NewformData.append("phoneNumber", countryCode + formData.phoneNumber);
    NewformData.append("email", formData.email);
    NewformData.append("quantity", formData.quantity);
    NewformData.append("deliveryDate", expectedDeliveryDate);
    NewformData.append("gerberFile", formData.file);
    NewformData.append("bomFile", formData.bomFile);
    NewformData.append("deliveryLocation", formData.deliveryLocation);
    NewformData.append("address", formData.address);
    NewformData.append("landmark", formData.landmark);
    NewformData.append("specialInstructions", formData.specialInstructions);

    if (formData.domCheck) {
      NewformData.append("domCheck", formData.domCheck);
    }
    if (formData.sourcebom) {
      NewformData.append("sourcebom", formData.sourcebom);
    }
    if (formData.makeStencil) {
      NewformData.append("makeStencil", formData.makeStencil);
    }
    if (formData.assemblyService) {
      NewformData.append("assemblyService", formData.assemblyService);
    }
    if (formData.testingService) {
      NewformData.append("testingService", formData.testingService);
    }
    if (formData.certificationCallback) {
      NewformData.append(
        "certificationCallback",
        formData.certificationCallback
      );
    }
    if (formData.firmwareDevelopment) {
      NewformData.append("firmwareDevelopment", formData.firmwareDevelopment);
    }
    if (formData.boxBuilding) {
      NewformData.append("boxBuilding", formData.boxBuilding);
    }
    NewformData.append(
      "services",
      JSON.stringify(Object.keys(selectedCheckboxes))
    );

    // Make a POST request with form-data
    fetch(`${FabUrl}/api/upload/`, {
      method: "POST",
      body: NewformData, // Use the FormData object as the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        console.log("Form data sent successfully:", data);
        // window.history.back();
        const mobileNumberCookie = Cookies.get("mobile_number");
        // console.log("mobileNumberCookie:", mobileNumberCookie);
        if (mobileNumberCookie) {
          console.log("Redirecting to /ordersection");
          navigate("/ordersection");
        } else {
          console.log("Redirecting to /innofab");
          navigate("/innofab");
        }
        console.log("Form data sent successfully:", data);
        // toast.success("Form submitted successfully!");
        console.log(
          localStorage.setItem("orderid", data.text_fields.phoneNumber)
        );
        const combinedMessage = (
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              width: `${Math.max(
                300,
                30 * (data.uniqueID.length + formData.name.length)
              )}px`,
              backgroundColor: "white",
              height: "auto",
            }}
          >
            <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Form submitted successfully!
            </p>
            <p>
              <strong>Order ID:</strong> {data.uniqueID}
            </p>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Mobile:</strong> {formData.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
          </div>
        );
        // Use the custom CombinedToast component
        toast(<CombinedToast combinedMessage={combinedMessage} />, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 10000, // 10 seconds
        });
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        toast.error("An error occurred. Please try again later.");
        setLoading(false);
        // Handle error if needed
      });

    // console.log(postData);
    // Serialize the postData object into URL-encoded format
    // const urlEncodedData = JSON.stringify(postData);
  };

  // select expected date

  const handleExpectedDeliveryDateChange = (event) => {
    // console.log("date", date);
    setExpectedDeliveryDate(event.target.value);
  };

  return (
    <>
      <div
        style={{
          // backgroundColor: "lightblue",
          height: "auto",
          // padding: "10px",
          // marginTop: "60px",
          background: " #ececff",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <Navbar /> */}
        <Header />

        <Container maxWidth="xl">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            User Requirement Desk
          </Typography>
          <Divider style={{ marginBottom: "20px" }} />
          <form onSubmit={handleSubmit}>
            <Container
              container
              spacing={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                />
              </Grid>

              <Grid container spacing={0.5} alignItems="flex">
                <Grid item>
                  <Select
                    name="countryCode"
                    value={countryCode}
                    onChange={(event) => setCountryCode(event.target.value)}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+144">+144</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                    InputProps={{
                      style: {
                        backdropFilter: "blur(12px)",
                        width: "100%",
                      },
                      readOnly: !!mobileNumberFromCookies,
                    }}
                    error={Boolean(formErrors.phoneNumber)}
                    // error={!!errors.contact}
                    helperText={formErrors.phoneNumber}
                    sx={{
                      // Apply styles for screens smaller than or equal to "sm" breakpoint
                      "@media (max-width: 304px)": {
                        width: "100%", // Set the width to 100% for smaller screens
                        // Add any other styles you want for smaller screens here
                      },
                      // // Apply styles for screens larger than "sm" breakpoint
                      // "@media (min-width: 601px)": {
                      //   // Add any other styles you want for larger screens here
                      // },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<BackupIcon />}
                  >
                    Upload Design (Gerber ZIP file)
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".zip"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
                {formData.file && (
                  <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                    {formData.file.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <label htmlFor="bom-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<BackupIcon />}
                  >
                    Upload BOM
                  </Button>
                  <input
                    id="bom-upload"
                    type="file"
                    accept=".csv, .xlsx"
                    style={{ display: "none" }}
                    onChange={handleBOMChange}
                  />
                </label>
                {formData.bomFile && (
                  <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                    {formData.bomFile.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Select Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                  error={Boolean(formErrors.quantity)}
                  helperText={formErrors.quantity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expected Delivery Date"
                  name="deliveryDate"
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={handleExpectedDeliveryDateChange}
                  required
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Set minimum date to today
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Delivery Location Pincode"
                  name="deliveryLocation"
                  type="number"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  required
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                  error={Boolean(formErrors.deliveryLocation)}
                  helperText={formErrors.deliveryLocation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Instructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  InputProps={{ style: { backdropFilter: "blur(12px)" } }}
                />
              </Grid>

              {/* check-box container */}
              <Grid item xs={12}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.domCheck}
                        onChange={handleChange}
                        name="domCheck"
                        value={formData.name}
                      />
                    }
                    label="Do DOM check"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.sourcebom}
                        onChange={handleChange}
                        name="sourcebom"
                      />
                    }
                    label="Source BOM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.makeStencil}
                        onChange={handleChange}
                        name="makeStencil"
                      />
                    }
                    label="Make stencil"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.assemblyService}
                        onChange={handleChange}
                        name="assemblyService"
                      />
                    }
                    label="Assembly service required"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.testingService}
                        onChange={handleChange}
                        name="testingService"
                      />
                    }
                    label="Testing service required"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.certificationCallback}
                        onChange={handleChange}
                        name="certificationCallback"
                      />
                    }
                    label="Callback request of certification"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.firmwareDevelopment}
                        onChange={handleChange}
                        name="firmwareDevelopment"
                      />
                    }
                    label="Firmware Development"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.boxBuilding}
                        onChange={handleChange}
                        name="boxBuilding"
                      />
                    }
                    label="Box building"
                  />
                </div>
              </Grid>
            </Container>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="noUnderline"
                style={{
                  borderRadius: "10px",
                  marginTop: "30px",
                  marginRight: "10px",
                }}
                disabled={loading} // Disable the button while loading is true
                //  onClick={handleSubmit}
                // onClick={checkUserExists}
              >
                SUBMIT
              </Button>
              <br></br>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(-1)} // This will go back to the previous page
                style={{
                  borderRadius: "10px",
                  marginTop: "30px",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </Button>
            </div>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default UserRequirementsForm;
