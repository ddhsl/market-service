import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({
    ordererName: "",
    ordererPhoneNumber: { first: "", middle: "", last: "" },
    ordererEmail: "",
    recipient: "",
    recipientPhoneNumber: { first: "", middle: "", last: "" },
    shippingAddress: {
      postalCode: "",
      address: "",
      detailAddress: "",
    },
    shippingMessage: "",
    paymentMethod: "card",
  });

  const updateOrderData = (newData) => {
    setOrderData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // 새로 추가된 resetOrderData 메서드
  const resetOrderData = () => {
    setOrderData({
      ordererName: "",
      ordererPhoneNumber: { first: "", middle: "", last: "" },
      ordererEmail: "",
      recipient: "",
      recipientPhoneNumber: { first: "", middle: "", last: "" },
      shippingAddress: {
        postalCode: "",
        address: "",
        detailAddress: "",
      },
      shippingMessage: "",
      paymentMethod: "card",
    });
  };

  return (
    <OrderContext.Provider
      value={{ orderData, updateOrderData, resetOrderData }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
