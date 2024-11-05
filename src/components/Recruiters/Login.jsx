import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now use formData here, e.g., send it to an API
    console.log("Form data submitted:", formData);
    navigate("/recruiters-dashboard");
  };

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
          <div className="login-title">Login</div>
          <form onSubmit={handleSubmit}>
            <label className="login-recruitment-label">
              Email address or Phone number
            </label>
            <input
              type="text"
              name="emailPhone"
              className="login-recruitment-input"
              placeholder="Enter email or phone number"
              value={formData.emailPhone}
              onChange={handleChange}
              required
            />{" "}
            <br />
            <small className="text-muted">
              We'll never share your email with anyone else.
            </small>
            <br />
            <br />
            <label className="login-recruitment-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="login-recruitment-input"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="login-remember">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => handleChange(e)}
              />

              <label className="login-recruitment-label">Remember me</label>
            </div>
            <div className="button-section">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="create-new-account-container">
            <div>
              Don't have an Account ?{" "}
              <Link to="/recruiters-signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterLogin;
