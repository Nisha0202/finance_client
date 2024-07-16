import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        emailOrMobile,
        pin
      });
      // Handle successful login
      console.log('Login successful:', response.data);
      navigate('/overview'),
      setError('');
      // Save JWT token to localStorage or session storage
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="h-screen-100 flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-4 w-full max-w-md m-2">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Email or Mobile Number
          </label>
          <input
            type="text"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Email or Mobile Number"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            PIN
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter PIN"
            required
          />
        </div>
        <div className='flex items-center gap-4 justify-between'>
          <Link to={'/'} className="btn border-blue-500 flex-1 border-2 text-gray-600 py-2 px-4 rounded">
            Back
          </Link>
          <button type="submit" className="btn bg-blue-500 flex-1 font-bold text-white py-2 px-4 rounded">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default Login;
