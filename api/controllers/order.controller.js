import Order from "../models/order.model.js";

// Function to create an order
export const createOrder = async (req, res) => {
  try {
    const { userId, cart, totalPrice, paymentId } = req.body;

    if (!userId || !cart || !totalPrice || !paymentId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: cart.map(item => ({
        product: item._id,
        qty: item.qty,
        pricePerKg: item.pricePerKg
      })),
      totalPrice,
      paymentId,
      status: 'completed' // Mark the order as completed after successful payment
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
