// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { FaCamera, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("./profilePicture.webp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preview image when selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("street", street);
      formData.append("city", city);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const token = res.data.token || res.data.data?.token;
      if (!token) throw new Error("Invalid response from server");

      const userData = jwtDecode(token);

      loginUser(userData, token); // automatically login after register
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Back button */}
      <div className="mb-4 absolute top-4 ">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center text-red-500 font-semibold hover:text-red-600"
        >
          <FaArrowLeft className="mr-2" /> Back to Menu
        </button>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-red-500 mb-6">
          Register
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-2 border-red-500"
            />
            <label className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 shadow-lg">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Phone */}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
          />

          {/* Street & City */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className="flex-1 px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="flex-1 px-4 py-3 sm:py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base md:text-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-3 md:py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base md:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:text-red-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
