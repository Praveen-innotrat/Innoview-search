import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URLS from "../config";
import { LoadingButton } from "@mui/lab";

const EnquiryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    services: [],
    specialInstructions: "",
  });
  const [loading, setLoading] = useState(false);
  const FabUrl = API_URLS.innofabapi;
  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    specialInstructions: "",
  });

  const handleInputChange = (field) => (event) => {
    console.log("field", field);
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };
  // console.log(formData);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const validateSpecialInstructions = (instructions) => {
    const wordCount = instructions.trim().split(/\s+/).length;
    return wordCount <= 180;
  };

  const handleSubmit = async (event) => {
    // console.log("clocked");
    event.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Please enter your name",
      contact: validateContact(formData.contact)
        ? ""
        : "Please enter a valid contact number",
      email: validateEmail(formData.email)
        ? ""
        : "Please enter a valid email address",
      specialInstructions: validateSpecialInstructions(
        formData.specialInstructions
      )
        ? ""
        : "Special instructions should not exceed 180 words",
    };

    setErrors(newErrors);

    // If there are no errors, you can proceed with form submission
    if (!Object.values(newErrors).some((error) => error !== "")) {
      try {
        // Create a FormData object
        const formDataObj = new FormData();

        // Append the fields and values to the FormData object
        formDataObj.append("Name", formData.name);
        formDataObj.append("contact_no", formData.contact);
        formDataObj.append("email_id", formData.email);
        formDataObj.append(
          "special_instructions",
          formData.specialInstructions
        );

        // console.log(formDataObj);

        // Append the selected services as an array (you may need to adjust the structure to match your backend)
        formData.services.forEach((service) => {
          formDataObj.append("slected_options", service);
        });

        setLoading(true);

        // Perform the POST request with the FormData object
        const response = await axios.post(
          `${FabUrl}/api/enquiryform/`,
          formDataObj
        );
        setLoading(false);
        toast.success("Enquiry form submitted successfully!");

        // const responseDataWithAppendedData = {
        //   ...response.data,
        //   appendedData: 'Your appended data here',
        // };

        setFormData({
          name: "",
          contact: "",
          email: "",
          services: [],
          specialInstructions: "",
        });

        // Close the form after submission
        onClose();
      } catch (error) {
        toast.error(error.message);
        console.error("Error submitting form:", error);
      }
    }
    // console.log(formData);
  };

  return (
    <Paper style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Please enter your name"
          value={formData.name}
          onChange={handleInputChange("name")}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Contact number"
          value={formData.contact}
          onChange={handleInputChange("contact")}
          error={!!errors.contact}
          helperText={errors.contact}
          style={{ marginBlock: "10px" }}
        />
        <TextField
          fullWidth
          label="Email id"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={!!errors.email}
          helperText={errors.email}
        />
        <div className="mt-4">
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
          style={{ marginBlock: "15px" }}
        />
        {/* <Button variant="contained" color="primary" type="submit">
          Submit
        </Button> */}

        <LoadingButton
          size="large"
          loading={loading}
          loadingPosition="end"
          variant="contained"
          type="submit"
        >
          <span>Submit </span>
        </LoadingButton>
      </form>
    </Paper>
  );
};

export default EnquiryForm;
