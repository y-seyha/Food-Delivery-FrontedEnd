import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import Loader from "../components/common/Loader";
import { FaArrowLeft } from "react-icons/fa";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ORDER.MY_ORDERS);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-red-500 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Empty Orders */}
      {orders.length === 0 && (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 text-lg">
            You haven’t placed any orders yet 🍽️
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Browse Food
          </button>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="font-semibold">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status || "Completed"}
              </span>
            </div>

            {/* Order Items */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-4 flex-wrap gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.food?.image || "/placeholder.png"}
                      alt={item.food?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{item.food?.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ${(item.food?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-red-500">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
