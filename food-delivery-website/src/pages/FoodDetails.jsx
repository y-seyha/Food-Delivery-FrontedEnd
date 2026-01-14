// src/pages/FoodDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "../components/common/Loader";
import { useCart } from "../hooks/useCart";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import { FaArrowLeft } from "react-icons/fa";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Fetch single food from backend
  const fetchFood = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.FOOD.DETAILS(id));
      setFood(res.data);
    } catch (error) {
      console.error("Failed to fetch food:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading) return <Loader />;

  if (!food)
    return <p className="text-center mt-20 text-red-500">Food not found!</p>;

  const handleAddToCart = () => {
    addToCart(food, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-16 max-w-3xl mx-auto p-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-6 hover:text-red-500 transition absolute top-2"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex flex-col gap-6 bg-white shadow-md rounded-lg p-6">
          {/* Food Image */}
          <div className="relative">
            {added && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                Added!
              </span>
            )}

            <img
              src={food.image || "/placeholder.png"}
              alt={food.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Food Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{food.name}</h1>
            <p className="text-gray-600">{food.description}</p>
            <p className="text-red-500 text-2xl font-bold">${food.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-2">
              <span>Quantity:</span>
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition relative"
            >
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FoodDetails;
