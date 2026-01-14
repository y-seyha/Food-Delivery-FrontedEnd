import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const { token, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        logoutUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, logoutUser]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading profile…</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
          Back
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg">My Profile</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 p-[3px]">
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-4xl font-bold">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <button
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{user.phone || "-"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Street</p>
                <p className="font-medium">{user.address?.street || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500">City</p>
                <p className="font-medium">{user.address?.city || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
