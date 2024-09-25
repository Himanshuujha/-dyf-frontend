// src/App.js
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import FlightResults from './pages/FlightResults';
import LoginPage from './auth/signup';
import Booking from './pages/Booking';
import AdminDashboard from './admin/Home';

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});
  return (
  <UserContext.Provider value={{userAuth, setUserAuth}}>
      <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path='/login'element={<LoginPage/>}/>
            <Route path="/" element={<Homepage />} />
            <Route path="/flights" element={<FlightResults />} />
            <Route path='/booking' element={<Booking/>} />
            <Route path='/dashboard' element={<AdminDashboard/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </UserContext.Provider>
  );
}

export default App;
