import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const currUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (currUser && currUser.currentUser && currUser.currentUser._id) {
          const res = await axios.get(`/api/order/getorders/${currUser.currentUser._id}`);
          if (res.status === 200) {
            setOrderHistory(res.data.orders); 
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
          orderHistory.map((order) => (
            <li key={order._id}>
              <h2>Order ID: {order._id}</h2>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <p>Crop ID: {item.cropId}</p>
                    <p>Farmer ID: {item.farmerId}</p>
                    <p>Quantity: {item.qty}</p>
                    <p>Price per kg: ₹{item.pricePerKg}</p>
                  </li>
                ))}
              </ul>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Payment ID: {order.paymentId}</p>
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
