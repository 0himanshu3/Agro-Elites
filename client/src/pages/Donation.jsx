import React from 'react';

function Donation() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 bg-gray-200 dark:bg-slate-700">
      
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-400 dark:bg-gradient-to-r dark:from-green-500 dark:to-green-700">
          <p className="text-black dark:text-white text-center text-lg font-semibold">
            Low rainfall this year has severely affected crop yield, pushing farmers into economic distress.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-emerald-400 to-lime-600 hover:from-lime-600 hover:to-emerald-400 dark:bg-gradient-to-r dark:from-green-500 dark:to-green-700">
          <p className="text-black dark:text-white text-center text-lg font-semibold">
            Farmers struggle to sell crops at fair prices due to the fluctuating market conditions.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-green-400 to-lime-500 hover:from-lime-500 hover:to-green-400 dark:bg-gradient-to-r dark:from-green-500 dark:to-green-700">
          <p className="text-black dark:text-white text-center text-lg font-semibold">
            Farmer suicides increase as debt piles up with little government support reaching them.
          </p>
        </div>
        <div className="p-6 rounded-xl w-72 h-48 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-lime-300 to-green-500 hover:from-green-500 hover:to-lime-300 dark:bg-gradient-to-r dark:from-green-500 dark:to-green-700">
          <p className="text-black dark:text-white text-center text-lg font-semibold">
            Our mission is to bring hope and financial aid to farmers in need. Let's work together!
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-500 ease-in-out dark:bg-slate-800">
        <h2 className="text-green-700 dark:text-white text-3xl font-bold mb-6 text-center">Support Our Farmers</h2>
        <input
          type="text"
          placeholder="Enter your UPI ID"
          className="w-full p-4 mb-4 rounded-md border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
        />
        <input
          type="text"
          placeholder="Enter amount"
          className="w-full p-4 mb-6 rounded-md border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
        />
        <button className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition duration-300">
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default Donation;
