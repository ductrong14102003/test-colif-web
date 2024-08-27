import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";
import apiClient from "../api/apiClient";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState();

  const fetchCarts = async () => {
    if (localStorage.getItem("auth-token")) {
      const r = await fetch(`${backend_url}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const result = await r.json();
      setCartItems(result);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await apiClient.get("/allproducts");
      setProducts(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCarts();
    fetchProducts();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = cartItems?.reduce((total, curr) => {
      return (total += curr.quantity * curr.variant.price);
    }, 0);

    return totalAmount;
  };

  const addToCart = async ({ productId, variantId }, callback) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }

    if (localStorage.getItem("auth-token")) {
      await fetch(`${backend_url}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, variantId }),
      });

      await fetchCarts();
      callback();
    }
  };

  const removeFromCart = async (id) => {
    if (localStorage.getItem("auth-token")) {
      await fetch(`${backend_url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await fetchCarts();
    }
  };

  const removeAllCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    removeAllCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
