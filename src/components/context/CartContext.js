// // /src/context/CartContext.js
// import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (course) => {

//     setCartItems([...cartItems, course]);
//     toast.success("Course added to the cart");
//   };

// const removeFromCart = (courseId) => {
//   const updatedCart = cartItems.filter((course) => course._id !== courseId);
//   setCartItems(updatedCart);
//   // toast.error("Course removed from the cart");
// };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export { CartProvider, useCart };

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_URLS from "../../config";
import Cookies from "js-cookie";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user details from authentication or any other source
    const authenticatedUser = Cookies.get("mobile_number"); // Replace with your authentication mechanism
    // console.log(authenticatedUser,": user from cart context");
    setUser(authenticatedUser);
  }, []);

  const addToCart = async (course) => {
    

  

    try {
      // Make API call to add course to the cart on the server
      const response = await axios.post(
        `${API_URLS.base}/api/add-to-cart/${user}`,
        {
          course_id : course._id,
        }
      );

      console.log(response.data, ": response from add to cart");

      // Check if the response status is OK (2xx)
      if (response.status >= 200 && response.status < 300) {
        // Update cartItems only if the server operation is successful
        setCartItems([...cartItems, course]);
        toast.success("Course added to the cart");
      } else {
        // Handle non-successful response status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle errors during the API call
      console.error("Error adding course to the cart:", error);
      toast.error("Failed to add course to the cart");
    }
  };

  const removeFromCart = async (courseId) => {
    
    try {
      // Make API call to remove course from the cart on the server
      const response = await axios.delete(
        `${API_URLS.base}/api/remove-from-cart/${user}/${courseId}`
      );

      console.log(response.data, ": response from remove from cart")

      // Check if the response status is OK (2xx)
      if (response.status >= 200 && response.status < 300) {
        // Update cartItems only if the server operation is successful
        const updatedCart = cartItems.filter(
          (course) => course._id !== courseId
        );
        setCartItems(updatedCart);
        toast.error("Course removed from the cart");
      } else {
        // Handle non-successful response status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle errors during the API call
      console.error("Error removing course from the cart:", error);
      toast.error("Failed to remove course from the cart");
    }
  };

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       if (!user) {
  //         throw new Error("User not authenticated");
  //       }

  //       // Make API call to fetch user's cart items from the server
  //       const response = await fetch(
  //         `${API_URLS.base}/api/get-course-ids/${user}`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const cartData = await response.json();
        

  //       if (cartData.user_courses.length === 0) {
  //         setCartItems([]);
  //       }else{
  //         setCartItems(cartData.user_courses);
  //       }
        
  //     } catch (error) {
  //       // console.error("Error fetching user's cart items:", error);
  //       // toast.error("Failed to fetch user's cart items");
  //     }
  //   };

  //   fetchCartItems();
  // }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
