// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuInbox } from "react-icons/lu";

const Navbar = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-red-500">
            NhamApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/menu"
              className="hover:text-red-500 transition flex items-center gap-1"
            >
              <FaBars /> Menu
            </Link>
            <Link
              to="/profile"
              className="hover:text-red-500 transition flex items-center gap-1"
            >
              <FaUser /> Profile
            </Link>
            <Link
              to="/cart"
              className="relative hover:text-red-500 transition flex items-center gap-1"
            >
              <FaShoppingCart />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs">
                  {totalItems ? totalItems : 0}
                </span>
              )}
            </Link>{" "}
            <Link
              to="/tracking"
              className="relative hover:text-red-500 transition flex items-center gap-1"
            >
              <LuInbox />
              Tracking
            </Link>{" "}
            <Link
              to="/orders"
              className="hover:text-red-500 transition flex items-center gap-1"
            >
              <MdOutlineFavoriteBorder />
              My Order
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/menu"
            className=" px-4 py-3 hover:bg-red-50 flex items-center gap-2"
          >
            <FaBars /> Menu
          </Link>
          <Link
            to="/profile"
            className=" px-4 py-3 hover:bg-red-50 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/cart"
            className=" px-4 py-3 hover:bg-red-50 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart /> Cart ({totalItems})
          </Link>
          <Link
            to="/tracking"
            className="px-4 py-3 hover:bg-red-50 flex items-center gap-2"
          >
            <LuInbox />
            Tracking
          </Link>{" "}
          <Link
            to="/orders"
            className="px-4 py-3 hover:bg-red-50 flex items-center gap-2"
          >
            <MdOutlineFavoriteBorder />
            My Order
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
