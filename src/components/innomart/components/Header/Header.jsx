import React, { useEffect, useState } from "react";
import marketLogo from "../../../../assets/innomartAsset/headerIcons/MarketLogo.png";
import microscopeLogo from "../../../../assets/innomartAsset/headerIcons/MicroscopeLogo.png";
import traningLogo from "../../../../assets/innomartAsset/headerIcons/TraningLogo.png";
import cartLogo from "../../../../assets/innomartAsset/headerIcons/cart.png";
import hardwareLogo from "../../../../assets/innomartAsset/headerIcons/hardwareLogo.png";
import innotratLogo from "../../../../assets/innomartAsset/headerIcons/innotrat-light.png";
import "./Header.css";

import headesetLogo from "../../../../assets/innomartAsset/headerIcons/headsetLogo.png";

import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    Cookies.remove("mobile_number");
    Cookies.remove("token"); // Remove the token from cookies

    setIsLoggedIn(false); // Set the login status to false
    // navigate("/");
  };

  return (
    <div className="header-container">
      <div className="header">
        <Link to="/" className="header-logo">
          <img src={innotratLogo} alt="" />
        </Link>
        <div className="header-menu">
          <>
            {isLoggedIn ? (
              <Link to="/elearning" className="header-menu-item one">
                <img src={traningLogo} alt="" />
              </Link>
            ) : (
              <Link to="/eureka" className="header-menu-item one">
                <img src={traningLogo} alt="" />
              </Link>
            )}
          </>

          <>
            {isLoggedIn ? (
              <Link to="/dashboard" className="header-menu-item two">
                <img src={microscopeLogo} alt="" />
              </Link>
            ) : (
              <Link to="/eureka" className="header-menu-item two">
                <img src={microscopeLogo} alt="" />
              </Link>
            )}
          </>

          <>
            {isLoggedIn ? (
              <Link to="/ordersection" className="header-menu-item three">
                <img src={hardwareLogo} alt="" />
              </Link>
            ) : (
              <Link to="/innofab" className="header-menu-item three">
                <img src={hardwareLogo} alt="" />
              </Link>
            )}
          </>

          <Link to="/innomart" className="header-menu-item four">
            <img src={marketLogo} alt="" />

            {/* <div className="header-innomart">
            <Link to="/innobator" className="header-innomart-item five">
              Innobator
            </Link>

            <Link to="/innolegal" className="header-innomart-item five">
              Innolegal
            </Link>

            <Link to="/innomechanical" className="header-innomart-item five">
              Innomechanical
            </Link>

            <Link to="/innodesign" className="header-innomart-item five">
              Innodesign
            </Link>
          </div> */}
          </Link>


        </div>
        <div className="header-user ">
          <Link to="/cart" className="header-user-menu header-cart">
            <img src={cartLogo} alt="" />
          </Link>

          <Link to="support" className="header-user-menu header-support">
            <img src={headesetLogo} alt="" />
          </Link>

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
              <Link to="/eureka">
                <button className="header-user-logout">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

// const Header = () => {
//   const headerItem = [
//     {
//       name: "E-learning",
//       icon: traningLogo,
//       dis: "translate-x-0",
//       marginTop: 2,
//       size: 10,
//     },
//     { name: "Eureka", icon: microscopeLogo, dis: "translate-x-24", size: 11 },
//     { name: "InnoFab", icon: hardwareLogo, dis: "translate-x-48", size: 8 },
//     { name: "InnoMart", icon: marketLogo, dis: "translate-x-72", size: 8 },
//   ];
//   const [active, setActive] = useState(null);

//   console.log("active", active);

//   return (
//     <div class=" bg-[#ECECFF] pt-10">
//     <div className="bg-[#FFFFFF] py-1 px-4 mx-16 rounded-lg flex justify-between items-center cursor-pointer sticky top-0">
//       <div className="">
//         <img src={innotratLogo} alt="" className="w-32" />
//       </div>
//       <div className="  flex gap-12  items-center relative">

//           <span className="h-12 w-12 bg-red-600 rounded-full absolute -top-10"></span>

//         {/* <img src={traningLogo} alt="" className="w-10 mt-2" />
//           <img src={microscopeLogo} alt="" className="w-11" />
//           <img src={hardwareLogo} alt="" className="w-[30px]" />
//           <img src={marketLogo} alt="" className="w-[30px]" /> */}
//         {headerItem.map((item, i) => (
//           <>
//             <img
//               src={item.icon}
//               alt=""
//               key={i}
//               className={`w-${item.size} mt-${item?.marginTop} ${
//                 i === active && "-mt-8 ml-2 text-white"
//               }`}
//               onClick={() => setActive(i)}
//             />

//           </>
//         ))}
//       </div>
//       <div className=" flex justify-end items-center gap-8 w-">
//         <IconLayoutGrid className=" text-[#034AAC]" size={28} />
//         <img src={cartLogo} alt="" className="w-9" />
//         <img src={headesetLogo} alt="" className="w-8 " />
//         <img src={userLogo} alt="" className="w-[30px]" />
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Header;
