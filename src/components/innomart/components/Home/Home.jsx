import React from "react";
// import Header from "../Header/Header";
import About from "../Enquiry/EnquiryForm";
// import Header from "../Header/Header";
import TestMonial from "../Testmonial/TestMonial";
import Banner from "../banner/Banner";
import CardSection from "../cardSection/CardSection";
import Starts from "../starts/Starts";
import Header from "../../../Header/Header";


const  Home = () => {
  return (
    <div className=" pb-[30px]  px-14 ">
      {/* <Header/> */}
      <Header/>
      <Banner/>
      <CardSection/>
      <TestMonial/>
      <Starts/>
      <About/>
     
     
    </div>
  );
};

export default Home;
