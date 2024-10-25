// MobileHeader.js

import React, { useState } from "react";
import './MobileHeader.css';
import innotratLogo from "../../assets/innotrat-light.png";
import { Link } from "react-router-dom";

const MobileHeader = ({ menuItems, isLoggedIn, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="mobile-header-container">
      <div className="mobile-header">
      <Link to="/" className="header-logo">
            <img src={innotratLogo} alt="" />
          </Link>
        <div className="mobile-header-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showMenu && (
        <div className="mobile-menu">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} className="mobile-menu-item">
              <div className="mobile-header-menu-item">
              <img style={{width:"100%", height:"100%"}} src={item.label} alt="" />
              </div>
              
            </Link>
          ))}
          {isLoggedIn ? (
            <button className="mobile-menu-item" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/eureka" className="mobile-menu-item">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
