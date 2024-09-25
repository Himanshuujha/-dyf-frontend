// src/components/Homepage.js
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Homepage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [travelClass, setTravelClass] = useState('economy');
  const [passengers, setPassengers] = useState(1);
  const [cities, setCities] = useState([]); // State to store cities


  const navigate = useNavigate();

  const getCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/cities');
      const citiesData = response.data.data.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCities(citiesData); // Set the mapped cities to state
      console.log(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearchFlights = (e) => {
    e.preventDefault();
    navigate('/flights', {
      state: {
        origin: origin?.label,
        destination: destination?.label,
        departureDate,
        travelClass,
        passengers,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#ebe9e1] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#d1e8e2] rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Your Perfect Flight</h2>
        <form className="space-y-6" onSubmit={handleSearchFlights}>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="origin">Origin</label>
              <Select
                id="origin"
                options={cities}
                className="w-full"
                placeholder="Search or select origin city"
                value={origin}
                onChange={setOrigin}
                onMenuOpen={getCities}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">Destination</label>
              <Select
                id="destination"
                options={cities}
                className="w-full"
                placeholder="Search or select destination city"
                value={destination}
                onChange={setDestination}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="departure-date">Departure Date</label>
              <input
                type="date"
                id="departure-date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
            
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="class">Class</label>
              <select
                id="class"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="passengers">Passengers</label>
              <input
                type="number"
                id="passengers"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                placeholder="1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
