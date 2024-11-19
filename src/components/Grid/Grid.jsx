import React from "react";
import "./Grid.css";
import { Link, useLocation } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useState } from "react";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";



const Grid = () => {

  const location = useLocation();

  const {menu, setMenu} = useContext(MessageContext)
  console.log(menu, "dfhdsfdsfkjds")
  const GridItems = [
    {
      id: 1,
      name: "Subscriptions",
      img: "",
      link: location.pathname === "/innorview" ?  ("/innorview/subscriptions") : ("/"),
    },
    {
      id: 2,
      name: "Eureka",
      img: "",
      link: "/chat",
    },
  
    {
      id: 3,
      name: "Innofab",
      img: "",
      link: "/ordersection",
    },
  
    {
      id: 4,
      name: "e-learning",
      img: "",
      link: "/elearning",
    },
    {
      id: 5,
      name: "Innomart",
      img: "",
      link: "/innomart",
    },
    {
      id: 6,
      name: "Innorview",
      img: "",
      link: "/innorview",
    },
  
    {
      id: 7,
      name: "Profile",
      img: "",
      link: "/profile",
    },
  
    {
      id: 8,
      name: "My Account",
      img: "",
      link: "/myaccount",
    },
    {
      id: 9,
      name: "cart",
      img: "",
      link: "/cart",
    },
    {
      id:10,
      name:"Interviews",
      img:"",
      link:"/interview-details",
    },
    {
      id:11,
      name: "Update Profile",
      img:"",
      link: "/innorview/update-profile",
      status: menu
    },
    {
      id:11,
      name: "InnoMechanical",
      img:"",
      link: "/innomechanical",
      status: menu
    }
  
   
  ];



  return (
    <div className="grid-container">
      <>
        {GridItems.map((item) => (
          
          <Link to={item.link} className="grid-items" key={item.id}>
            <Badge color="warning"  variant={item.status ? "dot" : ""}>
            <span style={{margin: "5px"}}>{item.name}</span>
            </Badge>
          </Link>
       
        ))}
      </>
    </div>
  );
};

export default Grid;
