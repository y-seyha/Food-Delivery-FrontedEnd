// src/components/food/FoodCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Add selected quantity to cart
  const handleAddToCart = () => {
    addToCart(food, quantity); // pass quantity
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Navigate to FoodDetails page
  const handleView = () => {
    navigate(`/foods/${food.id}`); // use id
  };

  return (
    <div className="relative bg-white border rounded-lg p-4 shadow-md hover:shadow-xl transition flex flex-col items-center">
      {/* Food Image */}
      <img
        src={food.image || "/placeholder.png"}
        alt={food.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Food Info */}
      <h2 className="font-semibold text-lg">{food.name}</h2>
      <p className="text-gray-500 mt-1 text-sm">{food.description}</p>
      <p className="text-red-500 font-bold mt-2">${food.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4 w-full">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition relative"
        >
          Add {quantity} to Cart
        </button>
        <button
          onClick={handleView}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          View
        </button>
      </div>

      {/* Added overlay */}
      {added && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
          Added!
        </span>
      )}
    </div>
  );
};

export default FoodCard;
