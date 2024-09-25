import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlightResults = () => {
  const location = useLocation();
  const { origin, destination, departureDate, travelClass, passengers } = location.state;

  // Sample data for available flights with seat availability
  const flights = [
    {
      id: 1,
      airline: 'Airline A',
      logo: 'https://via.placeholder.com/50',
      origin,
      destination,
      departureDate,
      travelClass,
      passengers,
      departureTime: '10:00 AM',
      arrivalTime: '12:00 PM',
      price: '$150',
      stops: 0,
      duration: '2h 0m',
      co2Emission: 99,
      seatAvailability: {
        economy: { available: 50, total: 100 },
        business: { available: 10, total: 20 },
        first: { available: 2, total: 5 },
      },
    },
    {
      id: 2,
      airline: 'Airline B',
      logo: 'https://via.placeholder.com/50',
      origin,
      destination,
      departureDate,
      
      travelClass,
      passengers,
      departureTime: '2:00 PM',
      arrivalTime: '4:00 PM',
      price: '$200',
      stops: 2,
      duration: '2h 0m',
      co2Emission: 144,
      seatAvailability: {
        economy: { available: 0, total: 100 },
        business: { available: 5, total: 20 },
        first: { available: 1, total: 5 },
      },
    },
    // Add more flights as needed
  ];

  // Filter states
  const [selectedStops, setSelectedStops] = useState('All');
  const [maxDuration, setMaxDuration] = useState(3); // Default max duration in hours
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('economy');

  // Filter flights based on selected filters
  const filteredFlights = flights.filter((flight) => {
    const flightDurationHours = parseInt(flight.duration.split('h')[0], 10);
    const maxStops = selectedStops === 'All' ? Infinity : parseInt(selectedStops, 10);
    const matchesStops = flight.stops <= maxStops;
    const matchesDuration = flightDurationHours <= maxDuration;
    const matchesDate =
      (!startDate || new Date(flight.departureDate) >= new Date(startDate)) &&
      (!endDate || new Date(flight.departureDate) <= new Date(endDate));

    return matchesStops && matchesDuration && matchesDate;
  });
  const navigate=useNavigate();
  const handleOnclick=()=>{
    navigate('/booking',{
      state: {
        origin: origin?.label,
        destination: destination?.label,
        departureDate,
        
        travelClass,
        passengers,
      },
    })
  }

  const getSeatColor = (available, total) => (available > 0 ? 'bg-green-500' : 'bg-red-500');

  return (
    <div className="relative min-h-screen bg-gray-100 pt-32 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Flights</h2>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <label className="text-gray-700">Stops:</label>
          <select
            value={selectedStops}
            onChange={(e) => setSelectedStops(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1"
          >
            <option value="All">All</option>
            <option value="0">Nonstop</option>
            <option value="1">1 Stop</option>
            <option value="2">2 Stops</option>
          </select>
        </div>

        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <label className="text-gray-700">Max Duration:</label>
          <input
            type="number"
            value={maxDuration}
            onChange={(e) => setMaxDuration(parseInt(e.target.value, 10))}
            min="1"
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 w-16"
          />
          <span className="text-gray-600">hours</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>
        </div>
      </div>

      {/* Class Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="text-gray-700">Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-3 py-1"
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredFlights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between transition-shadow duration-300 hover:shadow-lg"
          >
            {/* Airline Logo and Name */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={flight.logo} alt={`${flight.airline} logo`} className="w-12 h-12" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{flight.airline}</h3>
                <p className="text-sm text-gray-600">
                  {flight.departureTime} - {flight.arrivalTime}
                </p>
                <p className="text-sm text-gray-600">
                  {flight.duration} | {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-0">
              <div className="text-center md:text-left md:mr-6 mb-2 md:mb-0">
                <p className="text-gray-600">From</p>
                <p className="text-xl font-bold text-gray-800">{flight.origin}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600">To</p>
                <p className="text-xl font-bold text-gray-800">{flight.destination}</p>
              </div>
            </div>

            {/* Price and Seat Availability */}
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{flight.price}</p>
              <p className="text-gray-600">Round trip</p>

              {/* Seat Availability */}
              <div className="mt-4">
                <p className="text-gray-700">Seat Availability:</p>
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded ${getSeatColor(flight.seatAvailability[selectedClass].available, flight.seatAvailability[selectedClass].total)}`}
                    ></div>
                    <span className="text-gray-600 capitalize">{selectedClass}</span>
                    <span className="ml-2 text-gray-800">{flight.seatAvailability[selectedClass].available} seats available</span>
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <button onClick={handleOnclick} className="mt-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
