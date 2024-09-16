import React from 'react';

const GovernmentSchemes = () => (
  <div id="schemes" className="bg-yellow-200 p-4 rounded-lg">
    <h4 className="text-lg font-bold text-gray-900">Government Schemes</h4>
    <div className="bg-white text-gray-900 p-4 mb-4 rounded-lg">
      <h5 className="font-bold">PM-Kisan</h5>
      <p>Pradhan Mantri Kisan Samman Nidhi Scheme.</p>
      <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded">Read More</button>
    </div>
    <div className="bg-white text-gray-900 p-4 rounded-lg">
      <h5 className="font-bold">Mukhya Mantri Krishi Ashirwad Yojana</h5>
      <p>Benefits for farmers with small landholdings.</p>
      <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded">Read More</button>
    </div>
  </div>
);

export default GovernmentSchemes;
