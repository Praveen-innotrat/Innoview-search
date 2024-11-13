import React, { useState, useEffect } from "react";
import Signup from "../../assets/LoginScreens/Signup.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { margin } from "@mui/system";

function RecruiterSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal state
  const [userType, setUserType] = useState(""); // Track user type selection
  const navigate = useNavigate();
  const steps = ["Personal details", "Company details"];

  // Validation schema for form fields using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    companyName: Yup.string().required("Company name is required"),
    companyEmail: Yup.string()
      .email("Invalid email format")
      .required("Company email is required"),
    companyAddress: Yup.string().required("Company address is required"),
    companyLocation: Yup.string().required("Company location is required"),
    pincode: Yup.string().required("Pincode is required"),
    reasonForSignup: Yup.string().required("Reason for signup is required"),
    companywebsite: Yup.string()
      .url("Invalid website URL")
      .required("Company website is required"),
    companyPhone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Company phone number is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepIcon = (index) => {
    return index === 0 ? <AccountCircleIcon /> : <BusinessIcon />;
  };

  const handleModalClose = () => {
    if (userType) {
      setIsModalOpen(false); // Close modal only if an option is selected
    } else {
      alert("Please select a signup type.");
    }
  };

  return (
    <div className="recruiters-signup-wrapper">
      {/* Popup Modal for Signup Type Selection */}
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "600px", // Adjust width as needed
            height: "350px", // Adjust height as needed
            padding: "20px", // Optional: adds padding inside the dialog
            borderRadius: "10px", // Optional: rounds the corners
          },
        }}
      >
        <DialogTitle
          sx={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}
        >
          Select Signup Type
        </DialogTitle>

        {/* Larger font for title */}
        <DialogContent>
          <RadioGroup
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "16px" } }}
              value="freelancer"
              control={<Radio />}
              label="Signup for Freelancer"
            />
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "16px" } }}
              value="recruiter"
              control={<Radio />}
              label="Signup for Recruiters"
            />
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "16px" } }}
              value="hiringAgency"
              control={<Radio />}
              label="Signup for Hiring Agency"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalClose}
            variant="contained"
            sx={{ fontSize: "14px" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <div className="recruiter-signup-container">
        {/* Remaining Signup Form Code */}
        <div className="image-section">
          <img
            className="recruiter-signup-side"
            src={Signup}
            alt="signup-page"
          />
        </div>
        <div className="signup-form-section">
          <div className="login-title">Recruiter's Sign-up</div>

          <div className="stepper-wrapper">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={() => getStepIcon(index)}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: "14px",
                        color:
                          activeStep === index
                            ? "lightgray"
                            : index < activeStep
                            ? "blue"
                            : "black",
                      },
                      "& .MuiStepIcon-root": {
                        color:
                          activeStep === index
                            ? "lightgray"
                            : index < activeStep
                            ? "blue"
                            : "gray",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <Formik
            initialValues={{
              name: "",
              username: "",
              phone: "",
              email: "",
              password: "",
              companyName: "",
              companyAddress: "",
              companyLocation: "",
              pincode: "",
              reasonForSignup: "",
              companyEmail: "",
              companywebsite: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form data submitted:", values);
              navigate("/recruiters-login");
            }}
          >
            {({ errors, touched }) => (
              <Form className="signup-form">
                {step === 1 && (
                  <>
                    <label className="signup-recruitment-label">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="signup-recruitment-input"
                      placeholder="Enter Name"
                    />
                    {errors.name && touched.name && (
                      <div className="error">{errors.name}</div>
                    )}

                    <label className="signup-recruitment-label">Username</label>
                    <Field
                      type="text"
                      name="username"
                      className="signup-recruitment-input"
                      placeholder="Enter Username"
                    />
                    {errors.username && touched.username && (
                      <div className="error">{errors.username}</div>
                    )}
                    <label className="signup-recruitment-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="signup-recruitment-input"
                      placeholder="Enter Your Official Email"
                    />
                    {errors.email && touched.email && (
                      <div className="error">{errors.email}</div>
                    )}
                    <label className="signup-recruitment-label">
                      Phone number
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      className="signup-recruitment-input"
                      placeholder="Enter Phone No"
                    />
                    {errors.phone && touched.phone && (
                      <div className="error">{errors.phone}</div>
                    )}

                    <label className="signup-recruitment-label">Password</label>
                    <div className="password-input-wrapper">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="signup-recruitment-input"
                        placeholder="Password"
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}

                    <div className="button-section">
                      <Button
                        className="next-button"
                        type="button"
                        onClick={nextStep}
                        variant="contained"
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <label className="signup-recruitment-label">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Name"
                    />
                    {errors.companyName && touched.companyName && (
                      <div className="error">{errors.companyName}</div>
                    )}

                    <label className="signup-recruitment-label">
                      Company Website
                    </label>
                    <Field
                      type="text"
                      name="companywebsite"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Website URL"
                    />
                    {errors.companywebsite && touched.companywebsite && (
                      <div className="error">{errors.companywebsite}</div>
                    )}

                    <label className="signup-recruitment-label">
                      Company Email
                    </label>
                    <Field
                      type="email"
                      name="companyEmail"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Email"
                    />
                    {errors.companyEmail && touched.companyEmail && (
                      <div className="error">{errors.companyEmail}</div>
                    )}
                    <label className="signup-recruitment-label">
                      Company Phone Number
                    </label>
                    <Field
                      type="text"
                      name="companyPhone"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Phone Number"
                    />
                    {errors.companyPhone && touched.companyPhone && (
                      <div className="error">{errors.companyPhone}</div>
                    )}

                    <label className="signup-recruitment-label">
                      Company Address
                    </label>
                    <Field
                      type="text"
                      name="companyAddress"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Address"
                    />
                    {errors.companyAddress && touched.companyAddress && (
                      <div className="error">{errors.companyAddress}</div>
                    )}

                    <label className="signup-recruitment-label">
                      Company Location
                    </label>
                    <Field
                      type="text"
                      name="companyLocation"
                      className="signup-recruitment-input"
                      placeholder="Enter Company Location"
                    />
                    {errors.companyLocation && touched.companyLocation && (
                      <div className="error">{errors.companyLocation}</div>
                    )}

                    <label className="signup-recruitment-label">Pincode</label>
                    <Field
                      type="text"
                      name="pincode"
                      className="signup-recruitment-input"
                      placeholder="Enter Pincode"
                    />
                    {errors.pincode && touched.pincode && (
                      <div className="error">{errors.pincode}</div>
                    )}

                    <label className="signup-recruitment-label">
                      Reason for Signup
                    </label>
                    <Field
                      as="textarea"
                      name="reasonForSignup"
                      rows={5}
                      className="signup-recruitment-textarea"
                      placeholder="Enter reason for signing up"
                    />
                    {errors.reasonForSignup && touched.reasonForSignup && (
                      <div className="error">{errors.reasonForSignup}</div>
                    )}

                    <div className="step2-button-section">
                      <Button
                        className="step2-button step2-back-button"
                        type="button"
                        sx={{ fontSize: 14 }}
                        onClick={prevStep}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      <Button
                        className="step2-button sign-up"
                        sx={{ fontSize: 14 }}
                        type="submit"
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>

          <div className="create-new-account-container">
            <div>
              Already have an Account?{" "}
              <Link to="/recruiters-login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterSignup;
