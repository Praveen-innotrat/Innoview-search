import React, { useEffect, useState } from "react";
import "./Programs.css";
import Navbar from "../layout-components/Navbar";
import Lamp from "../../assets/lamp.png";
// import { popularCourse } from "../../data";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_URLS from "../../config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Programs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [popularCourse, setPopularCourse] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

 

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    // console.log("userIsLoggedIn : ", userIsLoggedIn )

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    const fetchPopularCourse = async () => {
      try {
        setIsLoading(true);
        const base = API_URLS.base;

        const res = await axios.get(`${base}/course_details`);

        setPopularCourse(res.data.data);
        console.log(res.data.data, " : Res");
        // console.log(popularCourse," : Popular Courses");

        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        return error;
      }
    };

    fetchPopularCourse();
  }, []);

  return (
    <div className="programs">
      {/* <Navbar /> */}
      <Header />
      <div className="programs-content">
        <div className="programs-heading">
          <h1>Ai: The Future Tech</h1>

          <div className="heading-icon">
            <img src={Lamp} alt="" />
          </div>
        </div>

        <div className="programs-div"></div>

        <div className="programs-container-parent">
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
              <div className="programs-container">
                {popularCourse.map((course) => (
                  <div className="programs-card" key={course._id}>
                    <div className="programs-card-img">
                      <video controls>
                        <source src={course.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="programs-card-text">
                      <h1>{course.CourseTitle}</h1>
                      <p>{course.Price}</p>
                      <p className="programs-desc">
                        {course.CourseDescription}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link to={`/programs/${course._id}`}>
                          <button className="programs-card-text-button">
                            Details
                          </button>
                        </Link>

                        {cartItems.some((item) => item._id === course._id) ? (
                          <button
                            className="programs-card-text-button"
                            onClick={() => removeFromCart(course._id)}
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <>
                            {isLoggedIn ? (
                              <>
                                <button
                                  className="programs-card-text-button"
                                  onClick={() => addToCart(course)}
                                >
                                  Add To Cart
                                </button>
                              </>
                            ) : (
                              <Link to='/eureka'>
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
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Programs;
