import React from 'react';
import { FaHome, FaCalendarAlt, FaBell, FaTrash, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { MdFlight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-purple-600 p-5 fixed left-0 top-0 bottom-0">
        <div className="text-white text-2xl font-bold mb-8 mt-8 flex items-center">
          <MdFlight className="mr-2" />
          Booking
        </div>
        <nav>
          <ul className="space-y-6 text-white">
            {/* Add NavLink for routing */}
            <li>
              <NavLink to="/dashboard" className="flex items-center" activeClassName="text-blue-300">
                <FaHome className="mr-2" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookings" className="flex items-center" activeClassName="text-blue-300">
                <MdFlight className="mr-2" />
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar" className="flex items-center" activeClassName="text-blue-300">
                <FaCalendarAlt className="mr-2" />
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" className="flex items-center" activeClassName="text-blue-300">
                <FaBell className="mr-2" />
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/trash" className="flex items-center" activeClassName="text-blue-300">
                <FaTrash className="mr-2" />
                Trash
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="flex items-center" activeClassName="text-blue-300">
                <FaCog className="mr-2" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-8 left-8 flex items-center text-white cursor-pointer">
          <FaSignOutAlt className="mr-2" />
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 ml-[20%] p-10"> {/* Added margin to avoid overlapping */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search here"
            className="border p-2 rounded-md w-1/3"
          />
          {/* User Profile */}
          <div className="flex items-center">
            <FaBell className="text-gray-400 mr-5" />
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Tanzir Rahman</span>
            </div>
          </div>
        </div>

        {/* Header Text */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-semibold mb-4">Online Booking System for all service-based industries</h1>
          <p className="text-gray-500 mb-4">
            Simply define your services and providers, display their availability, and you will have clients both old and new making bookings 24/7.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Book here</button>
        </div>

        {/* All Bookings Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Destination</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Flight Number</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-4 flex items-center">
                  <img src="https://via.placeholder.com/40" alt="Destination" className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <div>6.30PM</div>
                    <div className="text-gray-400">Dhaka</div>
                  </div>
                </td>
                <td className="px-4 py-4">27-06-2022</td>
                <td className="px-4 py-4">DH 202</td>
                <td className="px-4 py-4">
                  <button className="flex items-center text-pink-500">
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-4 flex items-center">
                  <img src="https://via.placeholder.com/40" alt="Destination" className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <div>5.30PM</div>
                    <div className="text-gray-400">Dhaka</div>
                  </div>
                </td>
                <td className="px-4 py-4">31-06-2022</td>
                <td className="px-4 py-4">FG 603</td>
                <td className="px-4 py-4">
                  <button className="flex items-center text-pink-500">
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
