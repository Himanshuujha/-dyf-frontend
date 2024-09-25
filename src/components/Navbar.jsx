import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const navigate = useNavigate();

  // Check for JWT token in localStorage on component mount
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  useEffect(() => {
    if (access_token) {
      setIsLoggedIn(true);
    }
    console.log(access_token);
  }, [access_token]);
  const location = useLocation(); // Get the current route

  // Check if the current path is '/admin'
  const isAdminPage = location.pathname === "/dashboard";

  // Conditionally render the navbar if not on the admin page
  if (isAdminPage) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove JWT token from localStorage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <nav className="bg-[#116466] p-4 fixed top-0 left-0 w-full z-50 shadow-md h-25">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          <img src="logo.png" alt="Logo" className="h-16 w-auto" />
        </a>
        <div className="flex items-center space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Contact
          </a>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <img
                src="/profile-icon.png" // Path to a generic user profile image
                alt="User Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                title="User Profile"
              />
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
