import React, { useEffect, useState } from "react";
import "./Program.css";
import Header from "../Header/Header";
import { useLocation } from "react-router";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import API_URLS from "../../config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Program = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  console.log(location);

  const path = location.pathname.split("/")[2];

  const [program, setProgram] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getProgram = async () => {
        const base = API_URLS.base;
        const { data } = await axios.get(`${base}/course_details/` + path);

        setIsLoading(false);
        setProgram(data?.data);
      };

      getProgram();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, [path]);
  console.log(program);
  //   console.log(location);

  useEffect(() => {
    // Check if the current program is already in the cart
    const isAlreadyInCart = cartItems.some((item) => item._id === program._id);
    setIsInCart(isAlreadyInCart);
  }, [cartItems, program]);

  const handleAddToCart = (course) => {
    if (isInCart) {
      removeFromCart(course._id);
    } else {
      addToCart(course);
    }
  };

  return (
    <div className="program">
      <Header />

      <>
        {isLoading ? (
          <div className="programs-container-parent">
            <div style={{ textAlign: "center", height: "100vh" }}>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "bolder",
                  color: "#034aac",
                }}
              >
                Loading.....
              </h1>
            </div>
          </div>
        ) : (
          <div className="program-container">
            <h1>{program.CourseTitle}</h1>

            <div className="program-details-container">
              <div className="program-details-container-left">
                <p>{program.CourseDescription}</p>
                <p>{program.Price}</p>

                {/* Conditional rendering based on whether the course is in the cart */}
                {isInCart ? (
                  <button
                    className="programs-card-text-button"
                    onClick={() => handleAddToCart(program)}
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <>
                        <button
                          className="programs-card-text-button"
                          onClick={() => handleAddToCart(program)}
                        >
                          Add To Cart
                        </button>
                      </>
                    ) : (
                      <Link to="/eureka">
                        <button
                          className="programs-card-text-button"
                          onClick={() => {
                            toast.error("Login Before adding to cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </Link>
                    )}
                  </>
                  // <button className="programs-card-text-button" onClick={() => handleAddToCart(program)}>
                  //   Add To Cart
                  // </button>
                )}
              </div>
              <div className="program-details-container-right">
                <video controls width="300" height="200">
                  <source src={program.Video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Program;
