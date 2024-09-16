import React from 'react';

const News = () => (
  <div id="news" className="bg-yellow-200 p-4 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-bold text-gray-900">News Section</h4>
      <button className="bg-green-700 text-white px-4 py-2 rounded">Read More</button>
    </div>
    <div className="bg-white text-gray-900 p-4 rounded-lg">
      <p>Latest news on agricultural market trends and government policies will be updated here.</p>
    </div>
  </div>
);

export default News;
