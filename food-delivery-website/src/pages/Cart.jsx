// src/pages/Cart.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useCart } from "../hooks/useCart";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  // Calculate total price
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // Checkout handler
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setCheckingOut(true); // <-- set to true at start

      const orderItems = cartItems.map((item) => ({
        foodId: item._id,
        quantity: item.quantity,
      }));

      const orderBody = {
        foods: orderItems,
        address: "Home Address", // TODO: replace with real user input
      };

      console.log("Checkout body:", orderBody);

      await axiosInstance.post(API_PATHS.ORDER.CREATE, orderBody);

      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setCheckingOut(false); // <-- always reset
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      {/* Container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* LEFT: CART ITEMS */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Cart Items</h2>

            {cartItems.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Your cart is empty
              </p>
            )}

            {/* Cart rows */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 items-center border-b pb-6 px-2 last:border-b-0"
                >
                  {/* Image */}
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            item.quantity > 1 && addToCart(item, -1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-lg text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PAYMENT */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Payment</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-red-500">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={clearCart}
                className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                disabled={checkingOut || cartItems.length === 0}
                className="w-full py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
              >
                {checkingOut ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
