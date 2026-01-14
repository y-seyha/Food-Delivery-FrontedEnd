import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import Loader from "../components/common/Loader";
import { FaArrowLeft, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-8 max-w-6xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/menu")}
        className="flex items-center gap-2 text-gray-600 hover:text-red-500 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Empty */}
      {orders.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg mb-4">
            You haven’t placed any orders yet 🍽️
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Browse Food
          </button>
        </div>
      )}

      {/* Orders */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-6 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-semibold">
                  Order ID: <span className="text-gray-500">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <FaClock />
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 h-fit rounded-full text-sm font-medium ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{order.address}</span>
            </div>

            {/* Items */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.food?.image || "https://via.placeholder.com/80"}
                      alt={item.food?.name}
                      className="w-16 h-16 rounded-lg object-cover border"
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
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-red-500">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Optional: Cancel button */}
            {/* {order.status === "Pending" && (
              <div className="text-right">
                <button className="text-sm text-red-500 hover:underline">
                  Cancel Order
                </button>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
