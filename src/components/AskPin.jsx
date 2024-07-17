import React, { useState } from 'react'

export default function () {

    const [pin, setPin] = useState('');

    const handleSubmit = () => {
      // Assuming you have some function to validate the PIN
      onPinSubmit(pin);
    };
  
  return (
    <div>


{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
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
      </div>
  </div>
</dialog>





    </div>
  )
}
