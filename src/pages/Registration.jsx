import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length !== 5 || isNaN(pin)) {
      setError('PIN must be a 5-digit number');
      return;
    }
    if (mobile.length !== 4 || isNaN(mobile)) {
      setError('Enter a valid 4 digit number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        pin,
        mobile,
        email,
        role, // Include role in the registration data
      });
      setSuccess('Registration successful! Please wait for admin approval.');
      setError('');
        // Clear form fields
        setName('');
        setPin('');
        setMobile('');
        setEmail('');
        setRole('user'); // Reset role to default
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
    



  };

  return (
    <div className="h-screen-100 flex items-center justify-center bg-gray-100 inter">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-full max-w-md m-2">
        <h2 className="text-xl font-semibold mb-4 md:mb-6 text-gray-900 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className='text-sm'>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">5-digit PIN</label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="tel"
              className="mt-1 block w-full p-2 border rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className='flex items-center gap-4'>
            <Link to={'/'} className="btn flex-1 border-blue-500 border-2 text-gray-600 py-2 px-4 rounded">
              Back
            </Link>
            <button type="submit" className="btn flex-1 bg-blue-500 font-bold text-white py-2 px-4 rounded">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
