import styled from "@emotion/styled";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../styles/Button";
import { CartState } from "../context/Context";

const Figure = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.5s linear;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover img {
    transform: scale(1.2);
  }
  img {
    max-width: 100%;
    margin-top: 2rem;
    height: 17rem;
    transition: all 0.2s linear;
    border-radius: 1.5rem;
    /* import radius into the background so that the color of the text uncomment */
  }
`;
const Wrapper = styled.div`
  border: 0.1rem solid rgb(170 170 170 / 40%);
  width: 26rem;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-sizing: border-box;
  border-radius: 2rem;

  .card-data {
    padding: 0.7rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    p {
      color: #482f2f;
      opacity: 0.8;
      font-weight: 400;
      text-align: justify;
      font-size: 1.2rem;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 1.35rem;
    color: #392a2ac7;
  }
  .cart-btns {
    .addToCart {
      margin: 0.7rem auto;
      background-color: #6969ff;
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: #fff;
      font-weight: bolder;

      &:hover {
        background-color: #ffffff2f;
        color: #000000;
        font-weight: 600;
        border: none;
        box-shadow: 0.2rem 0.2rem 0.2rem 0.1rem rgba(0, 0, 0, 0.2);
      }
    }
    .RemoveFromCart {
      background-color: #ff3838;
      color: white;
    }
  }
`;
const Card = (props) => {
  // ("props",props);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, img, desc, link, title } = props.item;
  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic

    setIsLoggedIn(userIsLoggedIn);
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <div className="card ">
        <Figure>
          <img src={img} alt="NotFound" />
        </Figure>
        <div className="card-data">
          <h3>{title}</h3>
          <p>
            {desc}
            <span
              style={{
                color: " #8433ff",
                fontSize: "1.3rem",
                fontWeight: "500",
              }}
            >
              <NavLink to={link}> &nbsp; More Details...</NavLink>
            </span>
          </p>
          <div className="cart-btns">
            {cart.some((p) => p.id === id) ? (
              <Button
                className="RemoveFromCart"
                onClick={() => {
                  if (!isLoggedIn) {
                    // ("clicked");
                    toast.error("please Login before remove Item");
                    return;
                  }
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: props.item,
                  });

                  toast.error(`${title} is removed` );
                }}
              >
                Remove From Cart
              </Button>
            ) : (
              <Button
                className="addToCart"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error("please Login before  Add to cart");
                    return;
                  }
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: props.item,
                  });
                  toast.success(`${title} is added`);
                }}
              >
                Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;



// import React from "react";
// import styled from "@emotion/styled";
// import { NavLink } from "react-router-dom";
// import { Button } from "../../styles/Button";
// import { CartState } from "../context/Context";

// const Figure = styled.div`
//   width: auto;
//   display: flex;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 0%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     cursor: pointer;
//     transition: all 0.5s linear;
//   }
//   &:hover::after {
//     width: 100%;
//   }
//   &:hover img {
//     transform: scale(1.2);
//   }
//   img {
//     max-width: 100%;
//     margin-top: 2rem;
//     height: 17rem;
//     transition: all 0.2s linear;
//     border-radius: 1.5rem;
//     /* import radius into the background so that the color of the text uncomment */
//   }
// `;
// const Wrapper = styled.div`
//   border: 0.1rem solid rgb(170 170 170 / 40%);
//   width: 26rem;
//   background-color: #ffffff;
//   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//   box-sizing: border-box;
//   border-radius: 2rem;
  
//   .card-data {
//     padding: 0.7rem 2rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap : 1rem;

//     p {
//       color: #482f2f;
//       opacity: 0.8;
//       font-weight: 400;
//       text-align: justify;
//       font-size: 1.2rem;
//     }
//   }

//   h3 {
//     font-weight: 600;
//     font-size: 1.35rem;
//     color: #392a2ac7;
//   }
//   .cart-btns {
//     .addToCart {
//       margin: 0.7rem auto;
//       background-color: #6969ff;
//       border: 0.1rem solid rgb(98 84 243);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       font-size: 1.2rem;
//       color: #fff;
//       font-weight: bolder;

//       &:hover {
//         background-color: #ffffff2f;
//         color: #000000;
//         font-weight: 600;
//         border: none;
//         box-shadow: 0.2rem 0.2rem 0.2rem 0.1rem rgba(0, 0, 0, 0.2);
//       }
//     }
//     .RemoveFromCart{
//       background-color: #ff3838;
//       color : white;
//     }
//   }
// `;
// const Card = (props) => {
//   // console.log("props",props);
//   const {id, img, desc, link, title} = props.item;
//   const {
//     state: { cart },
//     dispatch,
//   } = CartState();

//   console.log("cart",cart);
//   return (
//     <Wrapper>
//       <div className="card " >
//         <Figure >
//           <img src={img} alt="NotFound" />
//         </Figure>
//         <div className="card-data">
//           <h3>{title}</h3>
//           <p>
//             {desc}
//             <span
//               style={{
//                 color: " #8433ff",
//                 fontSize: "1.3rem",
//                 fontWeight: "500",
//               }}
//             >
//               <NavLink to={link}> &nbsp; More Details...</NavLink>
//             </span>
//           </p>
//           <div className="cart-btns">
//             {
//               cart.some(p=>p.id === id)?
//               (
//                 <Button className="RemoveFromCart"
//                 onClick={() => {
//                   dispatch({
//                     type : 'REMOVE_FROM_CART',
//                     payload : props.item,
//                   });
//                 }}>Remove From Cart</Button>)
//                 :(<Button className="addToCart" onClick={() => {
//                   dispatch({
//                     type : 'ADD_TO_CART',
//                     payload : props.item,
//                   });
//                 }}>Add To Cart</Button>)
//             }
            
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Card;
