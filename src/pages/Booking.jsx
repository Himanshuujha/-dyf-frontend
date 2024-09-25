import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [passengerInfo, setPassengerInfo] = useState({
    fullName: '',
    email: '',
    passportNumber: '',
    seatSelection: '',
  });
  const location = useLocation();
  const { origin, destination, departureDate, travelClass, passengers } = location.state;

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo({ ...passengerInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Submit booking info here
    console.log('Passenger Info:', passengerInfo);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Flight Booking</h1>
        
        {/* Flight Selection */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
          <p className="text-gray-600">From: {origin}</p>
          <p className="text-gray-600">To: {destination} </p>
          <p className="text-gray-600">Departure: {departureDate}, 10:00 AM</p>
          <p>Class: {travelClass}</p>
          <p>Number of passengers: {passengers}</p>
        </div>

        {/* Passenger Information Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
          <form onSubmit={handleBooking}>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={passengerInfo.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={passengerInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">
                  Passport Number
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={passengerInfo.passportNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="seatSelection" className="block text-sm font-medium text-gray-700">
                  Seat Selection
                </label>
                <select
                  id="seatSelection"
                  name="seatSelection"
                  value={passengerInfo.seatSelection}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Seat</option>
                  <option value="Window">Window</option>
                  <option value="Aisle">Aisle</option>
                  <option value="Middle">Middle</option>
                </select>
              </div>
            </div>

            {/* Payment Information */}
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              >
                Complete Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
