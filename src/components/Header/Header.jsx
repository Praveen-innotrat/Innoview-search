import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import marketLogo from "../../assets/MarketLogo.png";
import microscopeLogo from "../../assets/MicroscopeLogo.png";
import traningLogo from "../../assets/TraningLogo.png";
import hardwareLogo from "../../assets/hardwareLogo.png";
import innotratLogo from "../../assets/innotrat-light.png";
import cartLogo from "../../assets/cart.png";
import { IconLayoutGrid } from "@tabler/icons-react";
import headesetLogo from "../../assets/headsetLogo.png";
import userLogo from "../../assets/userLogo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import MobileHeader from "./MobileHeader";
import AppsIcon from "@mui/icons-material/Apps";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Grid from "../Grid/Grid";
import { MessageContext } from "../context/MessageContext";
import Badge from "@mui/material/Badge";
import { red } from "@mui/material/colors";

const Header = () => {
  const { menu, setMenu } = useContext(MessageContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [gridOn, setGridOn] = useState(false);

  const handleGrind = () => {
    setGridOn(!gridOn);
  };

  const navigate = useNavigate();

  const theme = true;

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const [active, setActive] = useState(0);

  const HeaderMenus = [
    { name: "E-learning", icon: traningLogo, dis: "translate-x-0", size: 16 },
    {
      name: "Eureka",
      icon: microscopeLogo,
      dis: "translate-x-[115px]",
      size: 20,
    },
    {
      name: "InnoFab",
      icon: hardwareLogo,
      dis: "translate-x-[210px]",
      size: 16,
    },
    {
      name: "InnoMart",
      icon: marketLogo,
      dis: "translate-x-[310px]",
      size: 16,
    },
  ];

  const grid = () => {
    return (
      <div>
        <Grid />
      </div>
    );
  };

  const handleNavigate = (name) => {
    console.log(name);
    switch (name) {
      case "E-learning":
        navigate("/elearning");
        break;
      case "Eureka":
        navigate("/dashboard");
        break;
      case "InnoFab":
        if (isLoggedIn) {
          navigate("/ordersection");
        } else {
          navigate("/innofab");
        }
        break;
      case "InnoMart":
        navigate("/innomart");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // console.log("mobile no. : ",Cookies.get("mobile_number"));
    // console.log("token: " , Cookies.get("token"));
    Cookies.remove("mobile_number");
    Cookies.remove("token"); // Remove the token from cookies

    setIsLoggedIn(false); // Set the login status to false
    // navigate("/");
  };

  return (
    <>
      <div className="header-container">
        <div className="header">
          <Link to="/" className="header-logo">
            <img src={innotratLogo} alt="" />
          </Link>
          {/* <div className="header-menu">
            <ul>
              <li className="list">
                <Link to="/elearning" className="header-menu-item one">
                  <img src={traningLogo} alt="" />
                  <span>eLearning</span>
                </Link>
              </li>
              <li className="list">
                <Link to="/dashboard" className="header-menu-item two">
                  <img src={microscopeLogo} alt="" />
                  <span>Eureka</span>
                </Link>
              </li>

              <>
                {isLoggedIn ? (
                  <li className="list">
                    <Link to="/ordersection" className="header-menu-item three">
                      <img src={hardwareLogo} alt="" />
                      <span>Innofab</span>
                    </Link>
                  </li>
                ) : (
                  <li className="list">
                    <Link to="/innofab" className="header-menu-item three">
                      <img src={hardwareLogo} alt="" />
                      <span>Innofab</span>
                    </Link>
                  </li>
                )}
              </>
              <li className="list">
                <Link to="/innomart" className="header-menu-item four">
                  <img src={marketLogo} alt="" />
                  <span>Innomart</span>
                </Link>
              </li>
            </ul>
          </div> */}

          {/* 
options in header bar
*/}

          {/* <div className="flex  items-center gap-16 cursor-pointer relative">
            <span
              className={`border-[4px] border-[#ECECFF] bg-white w-28 h-28 absolute  -top-14 duration-700 ${HeaderMenus[active].dis} rounded-[50%]  `}
              style={{
                borderRadius: "0px 30px",
              }}
            ></span>
            {HeaderMenus.map((item, i) => (
              <div>
                <a
                  onMouseEnter={() => setActive(i)}
                  onClick={() => handleNavigate(item.name)}
                >
                  <span className={`flex  pl-3 items-center`}>
                    <img
                      src={item.icon}
                      alt=""
                      className={`w-${item.size} ${
                        active === i && "-mt-6 mb-6 duration-500"
                      } z-50  `}
                    />
                  </span>
                  <span
                    className={`${
                      active == i
                        ? "translate-y-20 opacity-100 duration-500"
                        : "opacity-0 translate-y-10"
                    } text-2xl font-semibold`}
                  >
                    {item.name}
                  </span>
                </a>
              </div>
            ))}
          </div> */}

          <div className="header-user ">
            {/* <Link to="" className="header-user-menu ">
              <Badge color="warning" variant={menu ? "dot" : ""}>
                <AppsIcon
                  className="header-grid"
                  sx={{ fontSize: 40, color: "#034aac" }}
                  onClick={handleGrind}
                />
              </Badge>
            </Link>

            <Link to="" className="header-user-menu ">
              {theme ? (
                <Brightness4Icon
                  className="header-dark"
                  sx={{ fontSize: 40, color: "#034aac" }}
                />
              ) : (
                <DarkModeIcon
                  className="header-dark"
                  sx={{ fontSize: 40, color: "#034aac" }}
                />
              )}
            </Link> */}

            {/* <>
              {isLoggedIn ? (
                <Link to="/cart" className="header-user-menu header-cart">
                  <img src={cartLogo} alt="" />
                  {cartItemCount > 0 && (
                    <span className="cart-count">{cartItemCount}</span>
                  )}
                </Link>
              ) : (
                <Link
                  to="/eureka"
                  className="header-user-menu header-cart"
                  onClick={() => {
                    toast.error("Login before access cart");
                  }}
                >
                  <img src={cartLogo} alt="" />
                </Link>
              )}
            </> */}

            {/* <Link to="/support" className="header-user-menu header-support">
              <img src={headesetLogo} alt="" />
            </Link> */}

            <div className="header-user-menu header-user">
              {isLoggedIn ? (
                // <img src={userLogo} alt="" />

                <Link to="/">
                  <button
                    className="header-user-logout"
                    onClick={isLoggedIn ? handleLogout : null}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to="/logins">
                  <button className="header-user-logout">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="Gride-parent">{gridOn && grid()}</div>

      <MobileHeader
        menuItems={[
          { path: "/elearning", label: traningLogo },
          { path: "/dashboard", label: microscopeLogo },
          { path: "/ordersection", label: hardwareLogo },
          { path: "/innomart", label: marketLogo },
          { path: "/support", label: headesetLogo },
          { path: "/cart", label: cartLogo },
        ]}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;
