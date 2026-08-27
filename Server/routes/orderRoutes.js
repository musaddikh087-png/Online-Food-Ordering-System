import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

const isPositiveNumber = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

// POST /api/orders
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, phone, address, items, total } = req.body;
    const customerName = typeof name === 'string' ? name.trim() : '';
    const customerPhone = typeof phone === 'string' ? phone.trim() : '';
    const deliveryAddress = typeof address === 'string' ? address.trim() : '';

    if (!customerName || !customerPhone || !deliveryAddress || !Array.isArray(items) || !items.length || !isPositiveNumber(total)) {
      return res.status(400).json({
        message: 'Name, phone, delivery address, items, and total are required.',
      });
    }

    const validItems = items.every((item) => {
      if (!item || !item.name || !isPositiveNumber(item.price) || !Number.isInteger(item.quantity) || item.quantity < 1) {
        return false;
      }

      const calculatedSubtotal = item.price * item.quantity;
      return isPositiveNumber(item.subtotal) && Math.abs(item.subtotal - calculatedSubtotal) < 0.01;
    });

    if (!validItems) {
      return res.status(400).json({ message: 'Each order item must include valid name, price, quantity, and subtotal values.' });
    }

    const calculatedTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    if (Math.abs(total - calculatedTotal) >= 0.01) {
      return res.status(400).json({ message: 'Order total does not match the item subtotals.' });
    }

    const order = await Order.create({
      user: req.user.id,
      customerName,
      phone: customerPhone,
      deliveryAddress,
      items,
      total,
    });

    return res.status(201).json({ message: 'Order created successfully.', order });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create order.' });
  }
});

// GET /api/orders
router.get('/', authenticate, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Authentication is required to view your orders.' });
    }

    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve orders.' });
  }
});

export default router;
