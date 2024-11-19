import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
// import Navbar from "./Navbar"; 
import { ShoppingCartOutlined } from "@mui/icons-material";

const MainHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4.8rem;
  height: 6rem;
  background-color: #a6efff4a;

  .logo {
    font-size: 3rem;
    font-weight :  bolder;
    color: #000000;
    font-family: "Work Sans", sans-serif;
    text-align: center;
    position : relative;
  } 
  .logo::before{
    content : "INNOTRAT";
    width : 100%;
    color : #ffc739;
    position : absolute;
    top :0;
    left :0;
    border-right : .2rem solid #2ed573;
    animation : slide 3s linear infinite;
    -webkit-animation : slide 3s linear infinite;
    overflow : hidden;
  }
  @keyframes slide {
    0%{
      width : 0%;
    }
    50%{
      width : 100%;
    }
    100%{
      width : 0%;
    }
  }

  
  @media (max-width : ${({theme}) => theme.media.mobile}){
    .logo{
      font-size : 2.3rem;
    }
    .cart-icon{
      font-size : 1.9rem;
    }
    .badge{
      width : 1.2rem;
      height : 1.2rem;
      font-size : 0.9rem;
    }
  }
`;
const MenuItem = styled.div`
  position: relative;
  .cart-icon {
    font-size: 2.4rem;
  }

  .badge {
    font-size: 1.3rem;
    font-weight: normal;
    position: absolute;
    top: -0.2rem;
    right: -0.4rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: blue;
    color: white;
    display: flex;
    justify-content: center;
  }
`;

// const StyledBadge = styled.div``
const Header = () => {
  return (
    <MainHead>
      <NavLink style={{ textDecoration: "none" }} to="/">
        <div className="logo">
          INNOTRAT
        </div>
      </NavLink>
      {/* <Navbar /> */}
      <MenuItem>
        <NavLink to="/cart">
          <ShoppingCartOutlined
            className="cart-icon"
            color="action"
          ></ShoppingCartOutlined>
        </NavLink>
      </MenuItem>
    </MainHead>
  );
};

export default Header;
