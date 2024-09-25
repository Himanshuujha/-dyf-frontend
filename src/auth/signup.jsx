import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setUserAuth } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setError(null); // Clear any errors when toggling between forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = showSignUp ? '/user' : '/signin'; // URL depending on login/signup
    try {
      const response = await axios.post(`http://localhost:5001/api/v1${url}`, { email, password });
      console.log('Response:', response.data);
      if(!showSignUp){
        localStorage.setItem('jwtToken', response.data);
        setUserAuth({ access_token: response.data.data});
        navigate('/');
      }
      // Handle successful login/sign-up, like redirecting or showing success message
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-32">
      <div className="relative w-full max-w-4xl h-[600px] shadow-lg rounded-lg overflow-hidden flex bg-[#45a29e] items-center">
        
        {/* Stylish Text Section for Login */}
        <div
          className={`absolute right-0 h-full w-1/2 flex items-center justify-center text-center transition-opacity duration-500 ease-in-out ${showSignUp ? 'opacity-0' : 'opacity-100'} ${showSignUp ? 'z-0' : 'z-20'}`}
        >
          {!showSignUp && (
            <h1 className="text-5xl font-bold">
              <span className="block text-blue-500">
                Welcome
                <span className="absolute inset-0 bg-gradient-to-r from-[#45a29e] to-blue-100 -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
              <br />
              <span className="block text-red-500">
                Back!
                <span className="absolute inset-0 bg-gradient-to-l from-[#e3e2df] to-red-600 -z-10 transform -translate-x-2 -translate-y-2 blur-md"></span>
              </span>
            </h1>
          )}
        </div>

        <div
          className={`absolute w-1/2 h-full flex items-center justify-center text-center transition-opacity duration-500 ease-in-out ${showSignUp ? 'opacity-100' : 'opacity-0'} ${showSignUp ? 'z-20' : 'z-0'}`}
        >
          {showSignUp && (
            <h1 className="text-5xl font-bold space-y-4">
              <span className="block text-green-200 animate-fade-in delay-[0s]">
                Welcome,
                <span className="absolute inset-0 bg-gradient-to-l from-[#45a29e] to-blue-100 -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
              <br />
              <span className="block text-green-500 animate-fade-in delay-[0.5s]">
                Greetings
                <span className="absolute inset-0 bg-gradient-to-l from-[#45a29e] to-blue-100 -z-10 transform translate-x-2 translate-y-2 blur-md"></span>
              </span>
              <br />
              <span className="block text-purple-500 animate-fade-in delay-[1s]">
                from DYF
              </span>
            </h1>
          )}
        </div>

        {/* Login Section */}
        <div
          className={`absolute bottom-0 top-0 left-0 w-1/2 bg-gradient-to-r from-[#e7717d] to-[#45a29e] p-8 transition-transform duration-500 ease-in-out ${showSignUp ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
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
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {showSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <p className="mt-4 text-center">
            {showSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {showSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Sign Up Section */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#e7717d] to-[#45a29e] p-8 transition-transform duration-500 ease-in-out ${showSignUp ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
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
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {showSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <p className="mt-4 text-center">
            {showSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {showSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
