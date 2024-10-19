import React, { useState } from 'react';
import axios from 'axios';

const FetchTrends = () => {
  const [commodity, setCommodity] = useState('');
  const [state, setState] = useState('');
  const [market, setMarket] = useState('');
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    try {
      const response = await axios.get('/api/agmarknet', {
        params: { commodity, state, market },
      });
      setPrices(response.data.prices);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch prices');
      setPrices([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agmarknet Crop Prices</h1>
      <input
        type="text"
        placeholder="Commodity (Item)"
        value={commodity}
        onChange={(e) => setCommodity(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '200px' }}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '200px' }}
      />
      <input
        type="text"
        placeholder="Market (City)"
        value={market}
        onChange={(e) => setMarket(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '200px' }}
      />
      <button onClick={fetchPrices} style={{ margin: '5px', padding: '10px' }}>
        Fetch Prices
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {prices.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Price Trends:</h2>
          <ul>
            {prices.map((price, index) => (
              <li key={index}>
                <strong>Date:</strong> {price.date}, 
                <strong> Price:</strong> {price.price} INR, 
                <strong> Max Price:</strong> {price.maxPrice} INR, 
                <strong> Min Price:</strong> {price.minPrice} INR
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchTrends;
