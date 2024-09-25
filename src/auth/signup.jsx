// src/components/LoginPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUserAuth } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setError(null); // Clear any errors when toggling between forms
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = showSignUp ? "/user" : "/signin"; // URL depending on login/signup
    try {
      const response = await axios.post(`http://localhost:5001/api/v1${url}`, {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (!showSignUp) {
        localStorage.setItem("jwtToken", response.data);
        setUserAuth({ access_token: response.data.data });
        navigate("/");
      }
      // Handle successful login/sign-up, like redirecting or showing success message
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 pt-32 shadow-md">
      <div className="relative w-full max-w-4xl h-[600px] shadow-lg rounded-lg overflow-hidden flex bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec] items-center">
        {/* Stylish Text Section for Login */}
        <div
          className={`absolute right-0 h-full w-1/2 flex items-center justify-center text-center transition-opacity duration-500 ease-in-out ${
            showSignUp ? "opacity-0" : "opacity-100"
          } ${showSignUp ? "z-0" : "z-20"}`}
        >
          {!showSignUp && (
            <h1 className="text-5xl font-bold text-gray-700">
              <span className="block">
                Welcome
                <span className="absolute inset-0 bg-gradient-to-r from-[#a7bbc7] to-[#f0f4f8] -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
              <br />
              <span className="block">
                Back!
                <span className="absolute inset-0 bg-gradient-to-l from-[#b4dfe5] to-[#e2f0f9] -z-10 transform -translate-x-2 -translate-y-2 blur-md"></span>
              </span>
            </h1>
          )}
        </div>

        {/* Stylish Text Section for Sign Up */}
        <div
          className={`absolute w-1/2 h-full flex items-center justify-center text-center transition-opacity duration-500 ease-in-out ${
            showSignUp ? "opacity-100" : "opacity-0"
          } ${showSignUp ? "z-20" : "z-0"}`}
        >
          {showSignUp && (
            <h1 className="text-5xl font-bold space-y-4 text-gray-700">
              <span className="block">
                Join Us
                <span className="absolute inset-0 bg-gradient-to-l from-[#a7bbc7] to-[#f0f4f8] -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
              <br />
              <span className="block">
                Greetings
                <span className="absolute inset-0 bg-gradient-to-l from-[#b4dfe5] to-[#e2f0f9] -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
            </h1>
          )}
        </div>

        {/* Login Section */}
        <div
          className={`absolute bottom-0 top-0 left-0 w-1/2 bg-gradient-to-r from-[#e3f2fd] to-[#f0f4f8] p-8 transition-transform duration-500 ease-in-out ${
            showSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-400 text-white p-2 rounded hover:shadow-lg transition"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={toggleForm}
              className="text-blue-800 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Sign Up Section */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#87ceeb] to-[#a7bbc7] p-8 transition-transform duration-500 ease-in-out ${
            showSignUp ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-confirm-password"
                className="block text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-400 text-white p-2 rounded hover:shadow-lg transition"
            >
              Sign Up
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={toggleForm}
              className="text-blue-800 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
