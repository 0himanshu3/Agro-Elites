import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector for fetching from Redux
import axios from 'axios'; // For API requests

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const currUser = useSelector((state) => state.user); // Fetching current user from Redux

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (currUser && currUser.currentUser && currUser.currentUser._id) {
          const res = await axios.get(`/api/order/getorders/${currUser.currentUser._id}`);
          if (res.status === 200) {
            setOrderHistory(res.data); 
          }
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [currUser]); 

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orderHistory.length > 0 ? (
          orderHistory.map((order, index) => (
            <li key={index}>
              <p>Order ID: {order._id}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                Items: {order.items.map(item => `${item.cropId} (Qty: ${item.qty})`).join(', ')}
              </p>
              <p>Total: ₹{order.totalPrice}</p>
            </li>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </ul>
    </div>
  );
};

export default OrderHistory;
