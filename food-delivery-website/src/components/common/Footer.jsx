// src/components/common/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500">Foodie</h2>
            <p className="text-gray-400 text-sm">
              Delivering delicious food to your doorstep. Fast, fresh, and
              reliable.
            </p>

            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="hover:text-red-500 transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-red-500 transition">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-red-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-red-500 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-red-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-red-500 transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Contact & Support
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Need help? Reach out to us!
            </p>

            <ul className="text-sm text-gray-300">
              <li className="flex justify-between py-1">
                <span className="font-semibold">Phone</span>
                <a
                  href="tel:+1234567890"
                  className="hover:text-red-500 transition"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="flex justify-between py-1">
                <span className="font-semibold">Email</span>
                <a
                  href="mailto:support@foodie.com"
                  className="hover:text-red-500 transition"
                >
                  support@foodie.com
                </a>
              </li>
              <li className="flex justify-between py-1">
                <span className="font-semibold">Delivery Hours</span>
                8:00 AM – 10:00 PM
              </li>
              <li className="flex justify-between py-1">
                <span className="font-semibold">Address</span>
                123 Foodie Street, City, Country
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Foodie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
