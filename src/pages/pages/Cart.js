// import React, { useEffect, useState } from "react";

// import "../../src/components/CSS/Cart.css";
// import CartItem from "../components/CartItem";
// import styled from "@emotion/styled";
// import Navbar from "../components/layout-components/Navbar";
// import { CartState } from "../components/context/Context";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import API_URLS from "../config";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";

// const Cart = () => {
//   const handleCheckout = async (amount) => {
//     if (cart.length === 0) {
//       toast.error("Please add products to the cart before checkout.");
//       return;
//     }
//     // const mobileNumber = Cookies.get("mobile_number")
//     const userNumber = Cookies.get("mobile_number");
//     console.log("usernumber", userNumber);
//     // try{
//     //   const response = await fetch(`https://api.innotrat.com:5000/mobile_number?mobile_number=${userNumber}`);
//     //   const data = await response.json();

//     // if (data.success) {

//     try {
//       // Construct the payload for the API request
//       const payload = {
//         amount: "1",
//         PhoneNumber: userNumber,
//       };
//       const Payment = API_URLS.payment;
//       const response = await fetch(`${Payment}/initiate-payment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("data", data);

//       const responseData = data.url;
//       console.log("responseData", responseData);

//       // Redirect to the PhonePe payment page if needed
//       if (responseData) {
//         window.location.href = responseData;
//       } else {
//         console.error("URL not found in the response");
//         alert("URL not found in the response. Please try again later.");
//       }
//       // setIsLoading(false);
//     } catch (error) {
//       console.error("Error calling /initiate-payment API:", error.message);
//     }

// //     //   } else {
// //     //     // If success is false or user details are not found, redirect to the registration page
// //     //     window.location.href = "/registration";
// //     //   }
// //     // }
// //     //   catch (error) {
// //     //     // Handle API error
// //     //     console.error("Error fetching user details:", error);
// //     //     alert("Error fetching user details. Please try again later.");
// //     //   }
//   };

//   const {
//     state: { cart },
//     // dispatch,
//   } = CartState();
//   // const isLoggedIn =true;

//   const [total, setTotal] = useState();

//   useEffect(() => {
//     setTotal(cart.reduce((acc, curr) => acc + curr.price, 0));
//   }, [cart]);

//   console.log("cart", cart);

//   return (
//     <React.Fragment>
//       <div className="cart-container">
//         <div className="navbar">
//           {/* <Navbar /> */}
//           <Header />
//           {/* <Navbar isLoggedIn={isLoggedIn}/> */}
//         </div>
//         {/* <div className="head">YOUR CART</div> */}
//         <div className="head"></div>
//         <div className="top-data">
//           <NavLink to="/services">
//             {/* <button className="left-btn">CONTINUE SHOPPING</button> */}
//           </NavLink>
//           {/* <button className="right-btn"onClick={()=>handleCheckout(total)}>CHECKOUT NOW</button> */}
//         </div>
//         <div className="cart">
//           <div className="cart-control">
//             <div className="head-bar">
//               <h3>{cart.length} Courses In Cart</h3>
//               <p>items reserved for 30 minutes</p>
//             </div>
//             <div className="items">
//               {cart.map((prod) => (
//                 <CartItem key={prod.id} prod={prod} />
//               ))}
//             </div>
//           </div>
//           <div className="check-out">
//             <h2>TOTAL</h2>
//             <hr className="first-line"></hr>
//             <div className="sub-total">
//               <div className="total">Sub-total</div>
//               <div className="price">&#8377; {total} </div>
//             </div>
//             <div className="discount">
//               <div className="discount-title">Discount</div>
//               <div className="discount-number">&#8377; 0</div>
//             </div>
//             <hr></hr>
//             <div className="checkout-btn">
//               <button
//                 className="check-btn"
//                 onClick={() => handleCheckout(total)}
//               >
//                 CHECKOUT NOW
//               </button>
//             </div>
//             <div className="we-accept">WE ACCEPT :</div>
//             <div className="payment-methods">
//               <img src="./images/services/razorpay1.png" alt="razorpay" />
//               <img src="./images/services/phonepay.jpg" alt="razorpay" />
//               <img src="./images/services/paytm.jpg" alt="razorpay" />
//               <img src="./images/services/mastercard.png" alt="razorpay" />
//               <img src="./images/services/visa.png" alt="razorpay" />
//             </div>
//           </div>
//         </div>

//         <></>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Cart;

// const Wrapper = styled.div`
//   /* background-color :#93fffc; */
//   font-family: 'Work Sans', sans-serif;
//   height: 100%;
//   background: url("./images/services/cart-background.jpg");
//   background-size: cover;
//   object-fit: cover;
//   background-attachment: fixed;
//   background-position: center;
//   position: sticky;
//   height:100vh;

//   .navbar {
//     max-height: 5rem;
//     z-index: 999;
//   }
//   .head {
//     font-size: 2.8rem;
//     font-weight: 200;
//     color: gray;
//     text-align: center;
//     margin-top: 5rem;
//   }
//   .top-data {
//     display: flex;
//     justify-content: space-between;
//     .left-btn {
//       background-color: #fff;
//       color: black;
//       font-weight: 600;
//       padding: 0.7rem 1rem;
//       transition: all 0.3s ease-in-out;
//       margin: 0rem 2rem 2rem 2rem;
//       &:hover {
//         transform: scale(0.96);
//         background-color: #dbd3d3;
//       }
//     }
//     .right-btn {
//       background-color: #000;
//       color: white;
//       font-weight: 600;
//       margin: 0rem 2rem 2rem 2rem;
//       padding: 0.8rem 1.4rem;
//       transition: all 0.3s ease-in-out;
//       &:hover {
//         transform: scale(0.96);
//         background-color: #dbd3d3;
//         color: black;
//       }
//     }
//   }
//   .cart {
//     display: flex;
//     max-width: 100%;
//     padding-top:20px;
//     .cart-control {
//       display: flex;
//       flex-direction: column;
//       flex: 5;
//       max-width: 100%;
//       gap: 2rem;
//       .head-bar {
//         display: flex;
//         justify-content: space-between;
//         height: 3rem;
//         max-width: 82.5%;
//         background-color: #fff2dc;
//         align-items: center;
//         padding: 0rem 2rem;
//         margin-left: 2rem;
//         color:#000000;
//         border: 0.1rem ridge black;
//         p {
//           margin: auto 0;
//         }
//       }
//       .items {
//         padding: 0 2rem;
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;
//         max-width: 100%;
//       }
//     }

//     .check-out {
//       flex: 4;
//       max-height: 30rem;
//       max-width: 40rem;
//       background-color: #6d6d6d7a;
//       color: white;
//       margin-right: 16.5rem;
//       padding: 3rem;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
//         rgba(0, 0, 0, 0.22) 0px 15px 12px;
//       h2 {
//         text-align: left;
//         font-size: 1.9rem;
//         font-weight: 700;
//       }

//       .first-line {
//         opacity: 0.2;
//       }
//       .sub-total {
//         display: flex;
//         justify-content: space-between;
//         .total {
//           font-size: 1.5rem;
//           font-weight: 600;
//         }
//         .price {
//           font-size: 1.5rem;
//           font-weight: 200;
//         }
//       }
//       .discount {
//         display: flex;
//         justify-content: space-between;
//         font-size: 1.5rem;
//         .discount-title {
//           font-weight: 600;
//         }
//         .discount-number {
//           font-weight: 200;
//         }
//       }
//       .checkout-btn {
//         text-align: center;
//         .check-btn {
//           background-color: #c9680c;
//           color: white;
//           border: none;
//           transition: all 0.3s ease-in-out;
//           padding: 1.15rem 7rem;
//           font-weight: 600;
//           &:hover {
//             transform: scale(0.96);
//           }
//         }
//       }
//       .we-accept {
//         font-size: 1.25rem;
//         font-weight: 700;
//         color: white;
//       }
//       .payment-methods {
//         display: flex;
//         gap: 0.7rem;

//         img {
//           max-width: 100%;
//           height: 2.3rem;
//         }
//       }
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .head {
//       font-size: 2rem;
//     }
//     .top-data {
//       .left-btn {
//         padding: 0.5rem 0.6rem;
//         font-size: 0.9rem;
//       }
//       .right-btn {
//         padding: 0.6rem 1rem;
//         font-size: 0.9rem;
//       }
//     }
//     .cart {
//       display: flex;
//       flex-direction: column;
//       gap: 2rem;

//       .cart-control {
//         .head-bar {
//           margin: auto;
//           gap: 3rem;
//           font-size: 1rem;
//           max-width: 100%;
//         }
//         .items {
//           gap: 1rem;
//         }
//       }
//       .check-out {
//         margin: auto;
//         max-width: 100%;
//         max-height: 20rem;
//         padding: 1rem 2rem;
//         gap: 0.5rem;
//         h2 {
//           font-size: 1.2rem;
//         }
//         .sub-total {
//           .total {
//             font-size: 1.2rem;
//           }
//           .price {
//             font-size: 1.2rem;
//           }
//         }
//         .discount {
//           .discount-title {
//             font-size: 1.2rem;
//           }
//           .discount-number {
//             font-size: 1.2rem;
//           }
//         }
//         .checkout-btn {
//           .check-btn {
//             padding: 1rem 4rem;
//             font-size: 1.2rem;
//           }
//         }
//         .we-accept {
//           font-size: 1.1rem;
//         }
//         .payment-methods {
//           img {
//             height: 1.5rem;
//           }
//         }
//       }
//     }
//   }
// `;

import React, { useEffect, useState } from "react";
import "../../src/components/CSS/Cart.css";
import styled from "@emotion/styled";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../components/context/CartContext"; // Import the useCart hook
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cookies from "js-cookie";
import API_URLS from "../config";
import CartItem from "../components/CartItem";

import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  /* Add your styling as needed */
`;

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart(); // Use the useCart hook
  const navigate = useNavigate();

  // const handleCheckout = async (amount) => {
  //   if (cartItems.length === 0) {
  //     toast.error("Please add products to the cart before checkout.");
  //     return;
  //   }

  //   const userNumber = Cookies.get("mobile_number");

  //   try {
  //     // Construct the payload for the API request
  //     const payload = {
  //       amount: "1",
  //       PhoneNumber: userNumber,
  //     };
  //     const Payment = API_URLS.payment;
  //     const response = await fetch(`${Payment}/initiate-payment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("data", data);

  //     const responseData = data.url;
  //     console.log("responseData", responseData);

  //     // Redirect to the PhonePe payment page if needed
  //     if (responseData) {
  //       window.location.href = responseData;
  //     } else {
  //       console.error("URL not found in the response");
  //       alert("URL not found in the response. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error calling /initiate-payment API:", error.message);
  //   }
  // };

  const handleCheckout = async (amount) => {
    if (cartItems.length === 0) {
      toast.error("Please add products to the cart before checkout.");
      navigate("/programs");
      return;
    }
    // const mobileNumber = Cookies.get("mobile_number")
    const userNumber = Cookies.get("mobile_number");
    console.log("usernumber", userNumber);
    // try{
    //   const response = await fetch(`https://api.innotrat.com:5000/mobile_number?mobile_number=${userNumber}`);
    //   const data = await response.json();

    // if (data.success) {

    try {
      // Construct the payload for the API request
      const payload = {
        amount: "1",
        PhoneNumber: userNumber,
      };

      // console.log("payload : ", payload);
      const Payment = API_URLS.payment;

      // console.log(Payment);
      const response = await fetch(`${Payment}/initiate-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      //  console.log("response : " , response.data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("data : ", data);

      const responseData = data.url;
      // console.log("responseData : ", responseData);

      // Redirect to the PhonePe payment page if needed
      if (responseData) {
        window.location.href = responseData;
      } else {
        console.error("URL not found in the response");
        alert("URL not found in the response. Please try again later.");
      }
      // setIsLoading(false);
    } catch (error) {
      console.error("Error calling /initiate-payment API:", error.message);
    }

    //     //   } else {
    //     //     // If success is false or user details are not found, redirect to the registration page
    //     //     window.location.href = "/registration";
    //     //   }
    //     // }
    //     //   catch (error) {
    //     //     // Handle API error
    //     //     console.error("Error fetching user details:", error);
    //     //     alert("Error fetching user details. Please try again later.");
    //     //   }
  };
  const [total, setTotal] = useState();

  // useEffect(() => {
  //   setTotal(cartItems.reduce((acc, curr) => acc + curr.Price, 0));
  // }, [cartItems]);
  useEffect(() => {
    setTotal(cartItems.reduce((acc, curr) => acc + parseFloat(curr.Price), 0));
  }, [cartItems]);

  // console.log("cartItems", cartItems);

  return (
    <Wrapper>
      <div className="cart-container">
        <div className="navbar">
          <Header />
        </div>
        <div className="head"></div>
        <div className="top-data">
          <NavLink to="/services"></NavLink>
        </div>
        <div className="cart">
          <div className="cart-control">
            <div className="head-bar">
              <h3>{cartItems.length} Courses In Cart</h3>
              <p>items reserved for 30 minutes</p>
            </div>
            <div className="items">
              {cartItems.map((prod) => (
                <CartItem key={prod._id} prod={prod} />
              ))}
            </div>
          </div>
          <div className="check-out">
            <h2>TOTAL</h2>
            <hr className="first-line"></hr>
            <div className="sub-total">
              <div className="total">Sub-total</div>
              <div className="price">&#8377; {total} </div>
            </div>

            <div className="discount">
              <div className="discount-title">Discount</div>
              <div className="discount-number">&#8377; 0</div>
            </div>
            <hr></hr>
            {/* Render other details like discount, checkout button, etc. */}
            <div className="checkout-btn">
              <button
                className="check-btn"
                onClick={() => handleCheckout(total)}
              >
                CHECKOUT NOW
              </button>
            </div>
            <div className="we-accept">WE ACCEPT :</div>
            <div className="payment-methods">
              <img src="./images/services/razorpay1.png" alt="razorpay" />
              <img src="./images/services/phonepay.jpg" alt="razorpay" />
              <img src="./images/services/paytm.jpg" alt="razorpay" />
              <img src="./images/services/mastercard.png" alt="razorpay" />
              <img src="./images/services/visa.png" alt="razorpay" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
