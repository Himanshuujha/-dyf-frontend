// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#272727] text-white py-6 b-0">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="/" className="text-white font-semibold text-lg">Flight Booker</a>
        </div>
        <div className="space-x-4 mb-4">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </div>
        <div className="text-sm">
          <p>&copy; 2024 Flight Booker. All rights reserved.</p>
          <p>Powered by React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
