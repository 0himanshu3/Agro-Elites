import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, cart, totalPrice, paymentId } = req.body;

    if (!userId || !cart || !totalPrice || !paymentId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user: userId,
      items: cart.map(item => ({
        product: item._id,
        qty: item.qty,
        pricePerKg: item.pricePerKg
      })),
      totalPrice,
      paymentId,
      status: 'completed'
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
