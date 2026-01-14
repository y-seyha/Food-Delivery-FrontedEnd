import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import { useCart } from "../hooks/useCart";

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedFoodIds, setAddedFoodIds] = useState({}); // track overlay per item

  // Fetch foods from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.FOOD.FOODS);
        setFoods(res.data); // ensure each food has _id
      } catch (err) {
        console.error("API Error", err);
        setError("Failed to load food menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const handleAddToCart = (food) => {
    addToCart(food);

    // Show overlay for this specific food
    setAddedFoodIds((prev) => ({ ...prev, [food._id]: true }));

    // Hide overlay after 1.5s
    setTimeout(() => {
      setAddedFoodIds((prev) => ({ ...prev, [food._id]: false }));
    }, 1500);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="pt-16 text-center text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section>
          <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foods.map((food) => (
              <div
                key={food._id} // ✅ unique key for React
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer overflow-hidden flex flex-col relative"
              >
                {/* Food Image */}
                <div className="relative w-full h-52">
                  <img
                    src={food.image || "/placeholder.png"}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                    ${food.price}
                  </div>
                </div>

                {/* Food Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-semibold text-lg truncate">{food.name}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {food.description || "Delicious food to satisfy your hunger!"}
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto flex justify-between items-center pt-4">
                    <button
                      onClick={() => handleAddToCart(food)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Add to Cart
                    </button>

                    {/* View Details button */}
                    <button
                      onClick={() => navigate(`/foods/${food._id}`)}
                      className="text-red-500 font-semibold hover:underline text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Added to Cart overlay */}
                {addedFoodIds[food._id] && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                    Added!
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Menu;
