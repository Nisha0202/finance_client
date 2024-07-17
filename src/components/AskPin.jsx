import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function AskPin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('usertoken');
    if (token) {
      const decoded = jwtDecode(token);
      const userPin = decoded.pin;

      if (pin === userPin) {
        // Close the modal
        document.getElementById('my_modal_1').close(); // Close the dialog/modal
        // You may want to clear the pin input after successful submission
        setPin('');
      } else {
        // Show error message
        setError('Invalid PIN. Please try again.');
      }
    } else {
      setError('User token not found.'); // Handle case where token is not present
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="p-4">
            <label className="block mb-2">Enter PIN:</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Submit
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </dialog>
    </div>
  );
}
