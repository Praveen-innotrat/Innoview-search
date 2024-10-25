import styled from "@emotion/styled";
import "./CSS/Cart.css";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { CartState } from "./context/Context";
import { useCart } from "./context/CartContext";

const Wrapper = styled.div`
  .cartItems {
    height: 16rem;
    display: flex;
    gap: 2rem;
    position: relative;
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 1rem;
    max-width: 86%;
    color: #888;

    .image-container {
      img {
        max-width: 100%;
        height: 10rem;
      }
    }
    .data {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;

      .price {
        display: flex;
        gap: 1.5rem;
        font-size: 1.4rem;
        font-weight: 600;

        .regular-price {
          color: #a49c9c;
          font-weight: 100;
          text-decoration: line-through;
        }
      }
      .title {
        text-transform: capitalize;
        font-size: 1.3rem;
        font-weight: bold;
      }
      .duration h5 {
        font-size: 1.3rem;
        font-weight: 600;
      }
      .add-more {
        .add-btn {
          color: blue;
          border: 0.1rem solid gray;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.3rem 0.9rem;
          background-color: #fff;
          transition: all 0.3s ease-in-out;
          &:hover {
            transform: scale(0.94);
            background-color: #ffe8e8;
            color: black;
            border: 0.1rem solid lightgray;
          }
        }
      }
    }
    .remove-option {
      color: blue;
      position: absolute;
      font-size: 1.2rem;
      right: 10%;
      top: 10%;
      cursor: pointer;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .cartItems {
      margin: auto;
      gap: 1.4rem;
      height: 12rem;
      max-width: 100%;

      .image-container {
        img {
          height: 7rem;
          max-width: 100%;
        }
      }
      .data {
        gap: 0.3rem;
        .price {
          font-size: 1rem;
        }
        .title {
          font-size: 0.9rem;
        }
        .duration h5 {
          font-size: 0.9rem;
        }
        .add-more {
          .add-btn {
            padding: 0.2rem 0.4rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`;

const CartItem = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { Video, CourseTitle, Price, _id } = props.prod;
  const { addToCart, removeFromCart } = useCart(); // Use the useCart hook

  const handleRemove = () => {
    removeFromCart(_id); // Use removeFromCart from useCart
    // console.log(`${CourseTitle} removed from cart`);
  };

  const handleAddMore = () => {
    addToCart(props.prod); // Use addToCart from useCart
    console.log(`${CourseTitle} added to cart`);
  };

  // const { img, title, price } = props.prod;
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // const {
  //   state: { cart },
  //   dispatch,
  // } = CartState();

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <Wrapper>
      <div className="cartItems">
        <div className="image-container">
          <video controls autoplay>
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="data">
          <div className="price">
            <div className="discounted-price">&#8377; {Price}</div>
            <div className="regular-price">{Price + 2999}</div>
          </div>
          <div className="title"> {CourseTitle}</div>
          <div className="duration">
            <h5> Duration : 10 Hours Recorded Session 🕑</h5>
          </div>
          <div className="add-more">
            <NavLink to="/programs">
              <button className="add-btn">ADD MORE</button>
            </NavLink>
          </div>
        </div>

        <div
          className="remove-option"
          onClick={() => {
            handleRemove();
            toast.error(`${CourseTitle} is removed`);
          }}
        >
          Remove
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;

// import React from "react";
// import styled from "@emotion/styled";
// import { NavLink } from "react-router-dom";
// import { CartState } from "./context/Context";

// const Wrapper = styled.div`
//   .cartItems {
//     height: 16rem;
//     display: flex;
//     gap: 2rem;
//     position: relative;
//     align-items: center;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     padding: 1rem;
//     max-width: 86%;
//     color: #888;

//     .image-container {
//       img {
//         max-width: 100%;
//         height: 10rem;
//       }
//     }
//     .data {
//       display: flex;
//       flex-direction: column;
//       gap: 0.7rem;

//       .price {
//         display: flex;
//         gap: 1.5rem;
//         font-size: 1.4rem;
//         font-weight: 600;

//         .regular-price {
//           color: #a49c9c;
//           font-weight: 100;
//           text-decoration: line-through;
//         }
//       }
//       .title {
//         text-transform: capitalize;
//         font-size: 1.3rem;
//         font-weight: bold;
//       }
//       .duration h5 {
//         font-size: 1.3rem;
//         font-weight: 600;
//       }
//       .add-more {
//         .add-btn {
//           color: blue;
//           border: 0.1rem solid gray;
//           font-weight: 500;
//           font-size: 1rem;
//           padding: 0.3rem 0.9rem;
//           background-color: #fff;
//           transition: all 0.3s ease-in-out;
//           &:hover {
//             transform: scale(0.94);
//             background-color: #ffe8e8;
//             color: black;
//             border: 0.1rem solid lightgray;
//           }
//         }
//       }
//     }
//     .remove-option {
//       color: blue;
//       position: absolute;
//       font-size: 1.2rem;
//       right: 10%;
//       top: 10%;
//       cursor: pointer;
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .cartItems {
//       margin: auto;
//       gap: 1.4rem;
//       height: 12rem;
//       max-width: 100%;

//       .image-container {
//         img {
//           height: 7rem;
//           max-width: 100%;
//         }
//       }
//       .data {
//         gap: 0.3rem;
//         .price {
//           font-size: 1rem;
//         }
//         .title {
//           font-size: 0.9rem;
//         }
//         .duration h5 {
//           font-size: 0.9rem;
//         }
//         .add-more {
//           .add-btn {
//             padding: 0.2rem 0.4rem;
//             font-size: 0.8rem;
//           }
//         }
//       }
//     }
//   }
// `;

// const CartItem = (props) => {
//   const { img, title, price } = props.prod;

//   const {
//     state: { cart },
//     dispatch,
//   } = CartState();

//   return (
//     <Wrapper>
//       <div className="cartItems">
//         <div className="image-container">
//           <img src={img} alt="img" />
//         </div>
//         <div className="data">
//           <div className="price">
//             <div className="discounted-price">&#8377; {price}</div>
//             <div className="regular-price">{price + 2999}</div>
//           </div>
//           <div className="title"> {title}</div>
//           <div className="duration">
//             <h5> Duration : 10 Hours Recorded Session 🕑</h5>
//           </div>
//           <div className="add-more">
//             <NavLink to="/services">
//               <button className="add-btn">ADD MORE</button>
//             </NavLink>
//           </div>
//         </div>
//         <div
//           className="remove-option"
//           onClick={() => {
//             dispatch({
//               type: "REMOVE_FROM_CART",
//               payload: props.prod,
//             });
//           }}
//         >
//           Remove
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default CartItem;
