import React, { useState } from "react";
import "./Recruiter.css";

function MyProfile() {
  const [profileData, setProfileData] = useState({
    profileName: "",
    username: "",
    companyName: "",
    profilePicture: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: reader.result, // Base64 string for image preview
        }));
      };
      reader.readAsDataURL(file); // Convert image file to base64 URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted:", profileData);
    // Add logic here to save or update profile information
  };

  return (
    <>
      <div className="profile-tab">
        <div className="profile-img-section">
          <div className="profile-title">Profile Picture</div>
          <div className="profile-img-container">
            <img
              className="profile-img"
              src={
                profileData.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile-image"
            />
            <input
              className="update-img"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="profile-form">
          <form className="profile-form-details" onSubmit={handleSubmit}>
            <div className="input-profile-section">
              <label className="input-profile-label">Profile Name:</label>
              <input
                className="input-profile-field"
                type="text"
                name="profileName"
                value={profileData.profileName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-profile-section">
              <label className="input-profile-label">Username:</label>
              <input
                className="input-profile-field"
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-profile-section">
              <label className="input-profile-label">Company Name:</label>
              <input
                className="input-profile-field"
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-profile-section">
              <label className="input-profile-label">Phone Number:</label>
              <input
                className="input-profile-field"
                type="tel"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="save-details-profile">
              <button className="save-profile-btn" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
