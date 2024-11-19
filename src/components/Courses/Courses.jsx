import React from "react";
import Header from "../Header/Header";
import "./Courses.css";

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

import Video1 from "../../assets/intro.mp4";
import Video2 from "../../assets/drone.mp4";
import Video3 from "../../assets/ev.mp4";
import Video4 from "../../assets/security.mp4";
import Video5 from "../../assets/robotics.mp4";
import { Link } from "react-router-dom";
import { Rating } from "@mantine/core";
import user1 from "../../assets/user1.png";
import userIntraction from "../../assets/userIntraction.png";

const Courses = () => {
  return (
    <div className="courses-container">
      <Header />

      <div className="course-container">
        <Carousel withIndicators height={600} align="end" slideGap="md" controlSize={40} loop dragFree>
          <Carousel.Slide>
            <div className="course-container-div">
            {" "}
            <video src={Video1} controls autoPlay >
              Your browser does not support the video tag.
            </video>
            <h1>Introduction</h1>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="course-container-div">
            {" "}
            <video src={Video2} controls autoPlay >
              Your browser does not support the video tag.
            </video>
            <h1>Drones And UAV Design</h1>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="course-container-div">
            {" "}
            <video src={Video3} controls autoPlay >
              Your browser does not support the video tag.
            </video>
            <h1>Electric Vehicle Design</h1>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="course-container-div">
            {" "}
            <video src={Video4} controls autoPlay >
              Your browser does not support the video tag.
            </video>
            <h1>IOT/EMBEDDED and Hardware Security</h1>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
          <div className="course-container-div">
            {" "}
            <video src={Video5} controls autoPlay >
              Your browser does not support the video tag.
            </video>
            <h1>Robotic Hardware</h1>
            </div>
          </Carousel.Slide>
        </Carousel>
       
      </div>


      <>
            <div
              style={{
                background:
                  "#ececff url('../../assets/svg2.png') repeat center center fixed",
              }}
            >
              {/* banner */}
              {/* <div className="px-4 mx-4 md:mx-8 lg:mx-16 mt-10 flex flex-col-reverse h-[auto] md:flex-row items-center justify-center gap-4 md:gap-20 h-[auto] sm:flex flex-col justify-center items-center">
                <div className="w-[50%]  h-[300px] cursor-pointer gap-20 ">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#091133] mb-4 md:mb-10">
                    Learn.Grow.Evolve.
                  </h1>
                  <p className="text-[#505F98] mb-6 mt-2 text-base md:text-xl lg:text-2xl max-w-md">
                    Empower Your Hardware Dreams with Innotrat Labs: Your
                    Gateway to Cutting-edge IoT, Medical Electronics, and
                    Automation Solutions
                  </p>
                  <div className="flex items-center">
                    <Link to="/course">
                      <button className="text-lg bg-[#091133] text-[#FFFFFF] px-6 py-3 rounded-xl hover:scale-95 duration-500 ease-in-out">
                        View Demo
                      </button>
                    </Link>

                    {isLoggedIn ? (
                      <Link to="/dashboard">
                        <button className="text-lg bg-transparent text-[#091133] px-6 py-3 rounded-xl ml-4 border-2 border-solid border-[#091133] hover:scale-95 duration-500 ease-in-out font-semibold">
                          Get Started
                        </button>
                      </Link>
                    ) : (
                      <Link to="/eureka">
                        <button className="text-lg bg-transparent text-[#091133] px-6 py-3 rounded-xl ml-4 border-2 border-solid border-[#091133] hover:scale-95 duration-500 ease-in-out font-semibold">
                          Get Started
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-[50%]">
                  <img src={bannerImg} alt="" className="w-full" />
                </div>
              </div> */}
              {/* testmonials */}

              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-center gap-20 px-4 mx-2 md:mx-16 w-full">
                {/* left section */}
                <div className="w-full md:w-[40%] ml-4 md:ml-40  my-4 md:my-0 mr-4 md:mr-10">
                  <img
                    src={userIntraction}
                    alt=""
                    className="w-full md:w-[100%] md:h-[100%] sm:w-[360px] sm:h-[240px]"
                  />
                </div>

                {/* right section */}
                <div className="mt-10 md:mt-28 w-full md:w-[60%] h-auto float-left md:ml-6">
                  {/* top div */}
                  <div className="flex items-center justify-center flex-col w-full mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-[#091133] font-semibold  sm:text-4xl md:text-5xl lg:text-5xl mb-4 sm:mb-6 lg:mb-8">
                      Why choose us?
                    </h1>
                    <p className="text-[#3D497B] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10">
                      Fast, Powerful & Efficient
                    </p>
                    <ul className="flex flex-col gap-2 sm:gap-4">
                      <li className="text-[#3D497B] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Cutting-edge Solutions
                      </li>
                      <li className="text-[#3D497B] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Efficiency in Engineering
                      </li>
                      <li className="text-[#3D497B] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Precision and Speed
                      </li>
                      <li className="text-[#3D497B] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Innovation Unleashed
                      </li>
                    </ul>
                  </div>
                  {/* bottom div */}
                  <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-4 sm:flex flex-col justify-center items-center">
                    {/* Repeat this section as needed */}
                    <div>
                      <img src={user1} alt="" className="my-4" />
                      <p className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-[#091133] text-3xl sm:text-xl md:text-4xl lg:text-5xl font-bold">
                        {" "}
                        Alexandra Reynolds <Rating defaultValue={5} readOnly />
                      </p>
                      <p className="max-w-xs text-[#3D497B] leading-6 text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
                        {" "}
                        Innotrat Labs transformed my hardware concept into a
                        powerful reality. Fast, efficient, and outstanding
                        precision.{" "}
                      </p>
                    </div>
                    <div>
                      <img src={user1} alt="" className="my-4" />
                      <p className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-[#091133] text-3xl sm:text-xl md:text-4xl lg:text-5xl font-bold">
                        {" "}
                        Alexandra Reynolds <Rating defaultValue={5} readOnly />
                      </p>
                      <p className="max-w-xs text-[#3D497B] leading-6 text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
                        {" "}
                        Innotrat Labs transformed my hardware concept into a
                        powerful reality. Fast, efficient, and outstanding
                        precision.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* before footer */}
              <div className="flex flex-col justify-center items-center mt-10 gap-2">
                <h1 className="text-[#091133] font-semibold text-[30px] mb-4">
                  A Price To Suit Everyone
                </h1>
                <p className="text-[#6F7CB2] max-w-xl">
                  At Innotrat Labs, we believe that innovation should be
                  accessible to all. Our commitment to affordability doesn't
                  compromise the quality of our services. Experience excellence
                  in hardware solutions without breaking the bank. Discover a
                  range of pricing options designed to accommodate every budget,
                  ensuring that your journey from concept to product is not only
                  seamless but also cost-effective. With Innotrat Labs, your
                  hardware dreams come to life without financial barriers.
                </p>
                <p className="text-[#222F65] text-[40px]">
                  $49<sub className="text-[#6F7CB2] text-sm">/year</sub>
                </p>
                <span className="text-[#5D6970] text-base">
                  See, One price. Simple.
                </span>

                <button className="bg-[#091133] text-[#FFFFFF] px-11 py-2 rounded-md hover:scale-95 duration-500 ease-in-out">
                  Purchase Now
                </button>
              </div>
            </div>
          </>




    </div>
  );
};

export default Courses;
