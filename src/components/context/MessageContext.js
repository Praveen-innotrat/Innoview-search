import React, { createContext, useContext, useEffect, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [Message, setMessage] = useState("");
  const [orderData, setOrderData] = useState(null);
  const[allOrderId,setAllOrderId]=useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [amount, setAmount] = useState(0);
  const [ menu, setMenu] = useState(false)
  

  return (
    <MessageContext.Provider
      value={{
        amount,
        setAmount,
        Message,
        setMessage,
        orderData,
        setOrderData,
        allOrderId,
        setAllOrderId,
        selectedOrderId,
        setSelectedOrderId,
        menu,
        setMenu
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
