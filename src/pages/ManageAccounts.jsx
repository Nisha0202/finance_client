import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";

const ManageAccounts = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    }
  };


  useEffect(() => {
    fetchSearchUsers();
  }, [search]);

  const fetchSearchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', { params: { search } });
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}/status`, { status });
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setError('Error updating user status');
    }
  };

    // Function to clear the input field
    const clearInput = () => {
      setSearch('');
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Manage Accounts</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 text-sm flex justify-between items-center">
        {/* <input
          type="text"
          className="border rounded p-2 w-56"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
          <div className="relative">
      <input
        type="text"
        className="border rounded p-2 pl-4 w-56"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={clearInput}
        >
          <IoIosClose className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
        <Link to={'/'} className="btn btn-sm border-2 text-gray-600 rounded-md">
              Back
            </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {users.map((user) => (
              // Only render non-admin users
              user.role !== 'admin' && (
                <tr key={user._id}>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.mobile}</td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b">{user.status}</td>
                  <td className="py-3 px-4 flex gap-4 justify-end border-b">
                    <button
                      className="text-blue-700 btn btn-sm px-2 py-1 rounded mr-2"
                      onClick={() => updateUserStatus(user._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm text-red-700  px-2 py-1 rounded"
                      onClick={() => updateUserStatus(user._id, 'blocked')}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccounts;

