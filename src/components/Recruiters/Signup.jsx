import React, { useState } from "react";
import Signup from "../../assets/LoginScreens/Signup.svg";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function RecruiterSignup() {
  const [formData, setFormData] = useState({
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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    navigate("/recruiters-login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="recruiters-signup-wrapper">
      <div className="recruiter-signup-container">
        <div className="image-section">
          <img
            className="recruiter-signup-side"
            src={Signup}
            alt="signup-page"
          />
        </div>
        <div className="signup-form-section">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <label className="signup-recruitment-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="signup-recruitment-input"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">Phone number</label>
                <input
                  type="number"
                  name="phone"
                  className="signup-recruitment-input"
                  placeholder="Enter Phone No"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="signup-recruitment-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <br />
                <div className="button-section">
                  <button
                    className="next-button"
                    type="button"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="signup-recruitment-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className="signup-recruitment-input"
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">
                  Company Email
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  className="signup-recruitment-input"
                  placeholder="Enter Company Email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  className="signup-recruitment-input"
                  placeholder="Enter Company Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">
                  Company Location
                </label>
                <input
                  type="text"
                  name="companyLocation"
                  className="signup-recruitment-input"
                  placeholder="Enter Company Location"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  className="signup-recruitment-input"
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label className="signup-recruitment-label">
                  Reason for Signup
                </label>
                <textarea
                  name="reasonForSignup"
                  rows={5}
                  className="signup-recruitment-textarea"
                  placeholder="Enter reason for signing up"
                  value={formData.reasonForSignup}
                  onChange={handleChange}
                  required
                />

                <br />
                <br />

                <div className="button-section">
                  <button
                    className="back-button"
                    type="button"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button type="submit">Sign Up</button>
                </div>
              </>
            )}
          </form>
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
