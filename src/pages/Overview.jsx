import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

const Overview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded);
          const userId = decoded.userId;
          console.log('User ID:', userId);

          const userResponse = await axios.get(`http://localhost:5000/api/user/${userId}`);
          console.log('User Info:', userResponse.data);
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="bg-gray-100 h-screen-100 flex flex-col items-center justify-center py-6 px-4 inter">
      <div className="bg-white shadow-md rounded-lg lg:p-6 p-4 max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Overview</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <p className="text-gray-900">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email address:</label>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone number:</label>
          <p className="text-gray-900">{user.mobile}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role:</label>
          <p className="text-gray-900">{user.role}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Account Balance: <span className="text-blue-500">{user.balance} taka</span></label>
         
        </div>
        <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
          <p className="font-bold">Status: Pending Approval</p>
          <p>Your account is awaiting admin approval before full access is granted.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
