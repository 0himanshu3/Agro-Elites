import React from 'react';

function Donation() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12">
      
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-400">
          <p className="text-white text-center text-lg font-semibold">
            Low rainfall this year has severely affected crop yield, pushing farmers into economic distress.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500">
          <p className="text-white text-center text-lg font-semibold">
            Farmers struggle to sell crops at fair prices due to the fluctuating market conditions.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500">
          <p className="text-white text-center text-lg font-semibold">
            Farmer suicides increase as debt piles up with little government support reaching them.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-cyan-600 hover:to-teal-500">
          <p className="text-white text-center text-lg font-semibold">
            Our mission is to bring hope and financial aid to farmers in need. Let's work together!
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-500 ease-in-out">
        <h2 className="text-green-700 text-3xl font-bold mb-6 text-center">Support Our Farmers</h2>
        <input
          type="text"
          placeholder="Enter your UPI ID"
          className="w-full p-4 mb-4 rounded-md border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
        />
        <input
          type="text"
          placeholder="Enter amount"
          className="w-full p-4 mb-6 rounded-md border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
        />
        <button className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition duration-300">
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default Donation;
