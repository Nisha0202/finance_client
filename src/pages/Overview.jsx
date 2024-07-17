import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

const Overview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded);
          const userId = decoded.userId;
          const userRole = decoded.role;
          console.log('User ID:', userId);
          console.log('Role:', role);
          setRole(userRole);
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

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('usertoken');

    navigate('/');
  };

  if (loading) {
    return <div className='flex items-center justify-center h-screen-100 text-lg font-bold'>Loading...</div>;
  }

  if (!user) {
    return <div className='flex items-center justify-center h-screen-100 text-lg font-bold'>No user data available</div>;
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
        {/* <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
          <p className="font-bold">Status: Pending Approval</p>
          <p>Your account is awaiting admin approval before full access is granted.</p>
        </div> */}
        {user.status === 'pending' && (
          <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 mb-6">
            <p className="font-bold">Status: Pending Approval</p>
            <p>Your account is awaiting admin approval before full access is granted.</p>
          </div>
        )}
        <div>

          <div className='flex justify-between text-sm items-center'>
            <button  onClick={handleLogout} className=" hover:text-red-700 text-red-500 font-bold  rounded" >
              Logout
            </button>
            {role === 'admin' && ( <div>
            <Link to={'/alltransactions'} className="btn btn-sm hover:text-blue-700 text-blue-500 font-bold rounded-md" >
            Transactions
            </Link>
            <Link  to={'/manaage'} className="btn btn-sm hover:text-blue-700 text-blue-500 font-bold rounded-md" >
           Accounts
            </Link>
            </div>
               )}
          </div>

        </div>

      </div>
    </div>
  );

  //   <div className="bg-gray-100 h-screen-100 flex flex-col items-center justify-center py-6 px-4 inter">
  //     <div className="bg-white shadow-md rounded-lg lg:p-6 p-4 max-w-md w-full mx-auto">
  //       <h2 className="text-xl font-bold mb-4 text-center">Overview</h2>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 font-bold mb-2">Name:</label>
  //         <p className="text-gray-900">{user.name}</p>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 font-bold mb-2">Email address:</label>
  //         <p className="text-gray-900">{user.email}</p>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 font-bold mb-2">Phone number:</label>
  //         <p className="text-gray-900">{user.mobile}</p>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 font-bold mb-2">Role:</label>
  //         <p className="text-gray-900">{user.role}</p>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 font-bold mb-2">Account Balance: <span className="text-blue-500">{user.balance} taka</span></label>

  //       </div>
  //       <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
  //         <p className="font-bold">Status: Pending Approval</p>
  //         <p>Your account is awaiting admin approval before full access is granted.</p>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Overview;
