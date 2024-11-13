import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Login from "../../assets/LoginScreens/Login.svg";
import "./Recruiter.css";
import { Link, useNavigate } from "react-router-dom";

function RecruiterLogin() {
  const [formData, setFormData] = useState({
    emailPhone: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    emailPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="recruiters-login-wrapper">
      <div className="recruiter-login-container">
        <div className="image-section">
          <img className="recruiter-login-side" src={Login} alt="login-page" />
        </div>
        <div className="login-form-section">
          <div className="login-title">Recruiter's Login</div>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setFormData(values);
              console.log("Form data submitted:", values);
              navigate("/recruiters-dashboard");
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <label className="login-recruitment-label">
                  Email address or Phone number
                </label>
                <Field
                  type="text"
                  name="emailPhone"
                  className="login-recruitment-input"
                  placeholder="Enter email or phone number"
                />
                <ErrorMessage
                  name="emailPhone"
                  component="div"
                  className="error-message"
                />
                <br />
                <small className="text-muted">
                  We'll never share your email with anyone else.
                </small>
                <br />
                <br />
                <label className="login-recruitment-label">Password</label>
                <div className="password-input-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="login-recruitment-input"
                    placeholder="Password"
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="login-remember">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="login-recruitment-label">Remember me</label>
                </div>
                <div className="button-section">
                  <button type="submit">Login</button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="create-new-account-container">
            <div>
              Don't have an Account?{" "}
              <Link to="/recruiters-signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterLogin;
