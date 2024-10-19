import express from "express"
import { createOrder } from "../controllers/order.controller.js";
const router = express.Router();

// Route to create a new order
router.post('/create', createOrder);

export default router
