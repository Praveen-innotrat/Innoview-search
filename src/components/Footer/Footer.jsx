import { Input } from "@mantine/core";
import React from "react";
import "./Footer.css";
// import facebookLogo from "../../assets/facebook-icon.png";
// import instagramLogo from "../../assets/instagram-icon.png";
// import linkdinLogo from "../../assets/linkdin-icon.png";
// import youtubeLogo from "../../assets/youtube.png";
import { Link } from "react-router-dom";
import StickyFooter from "../layout-components/StickyFooter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='footer'>

//     </div>
//   )
// }

// export default Footer

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="flex flex-col md:flex-row sm:flex-col justify-center items-center footer-container py-4 mt-6 px-5 cursor-pointer flex gap-10 bg-[#FFF] rounded-lg">
        <div className=" footer-section subscribe w-full px-4 py-2 ">
          <h1 className="text-[#000] font-bold text-2xl">UPDATE</h1>
          <p className="text-[#000000] mt-2 mb-2">
            Subscribe to newsletter & be the first to know about exclusive & new
            launches.
          </p>
          <Input placeholder="email address" className="shadow-md" />
          <button className="text-[#FFF] bg-[#3A2E2E] mt-4 px-7 py-3 rounded-md  text-2xl cursor-pointer hover:scale-95 duration-500 ease-in-out">
            Subscribe
          </button>
        </div>
        <span className="w-[1px] h-56 border-[1px] border-[#d3dce4] hidden sm:flex md:border-transparent md:hidden lg:hidden xl:hidden"></span>
        <div className="social-media-icons-container">
          <h1 className="text-[#000000] font-semibold  text-2xl">
            STAY CONNECTED
          </h1>
          <div className="social-media-icons">
            <Link to="https://www.facebook.com/InnotratLabs" target="_blank">
              <FacebookIcon sx={{ fontSize: 40 }} className="facebook-icon" />
            </Link>
            <Link to="https://www.instagram.com/innotrat.labs/" target="_blank">
              <InstagramIcon sx={{ fontSize: 30 }} className="instagram-icon" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/innotrat-labs/"
              target="_blank"
            >
              <LinkedInIcon sx={{ fontSize: 40 }} className="linkedin-icon" />
            </Link>
            <Link
              to="https://www.youtube.com/channel/UCZqSqrzbG0xudobdxRkMP3g"
              target="_blank"
            >
              <YouTubeIcon sx={{ fontSize: 40 }} className="youtube-icon" />
            </Link>
          </div>
        </div>
        <span className="w-[1px] h-56 border-[1px] border-[#d3dce4] hidden sm:flex md:border-transparent md:hidden lg:hidden xl:hidden"></span>
        <div className=" footer-section w-full px-4 py-2 flex justify-center  flex flex-col gap-2   ">
          <h1 className="text-[#000000]  text-2xl font-semibold">
            CUSTOMER SERVICE
          </h1>
          <div className="text-[#000000] text-lg  ">My Account</div>
          <div className="text-[#000000] text-lg">Privacy Policy</div>
          <div className="text-[#000000] text-lg">Contact Us</div>
        </div>
        <span className="w-[1px] h-56 border-[1px] border-[#d3dce4] hidden sm:flex md:border-transparent md:hidden lg:hidden xl:hidden"></span>
        <div className="  footer-section w-full px-4 py-2 flex justify-center  flex flex-col gap-2   ">
          <h1 className="text-[#000000]  text-2xl font-semibold">
            INFORMATION
          </h1>
          <div className="text-[#000000] text-lg  ">About Us</div>
          <div className="text-[#000000] text-lg  ">Blogs</div>
          <div className="text-[#000000] text-lg  ">Location</div>
        </div>
      </div>

      <StickyFooter />
    </div>
  );
};

export default Footer;
