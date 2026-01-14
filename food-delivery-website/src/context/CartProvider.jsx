import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
const addToCart = (food, quantity = 1) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item._id === food._id);
    if (existing) {
      // Increment by the passed quantity
      return prev.map((item) =>
        item._id === food._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      return [...prev, { ...food, quantity }];
    }
  });
};


  // Remove item
  const removeFromCart = (foodId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== foodId));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
