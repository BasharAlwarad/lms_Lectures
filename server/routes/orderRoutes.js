import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  innerJoin,
  leftJoin,
  rightJoin,
  fullJoin,
} from '../controllers/orderControllers.js';

const router = express.Router();
import { discountMiddleware } from '../middlewares/discountMiddleware.js';

// Order Routes
router.get('/', getOrders);
router.get('/order/:id', getOrderById);
router.post('/', createOrder);
router.post('/wd60', discountMiddleware, createOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

// Order Joins Routes
router.get('/inner-join', innerJoin);
router.get('/left-join', leftJoin);
router.get('/right-join', rightJoin);
router.get('/full-join', fullJoin);

export default router;
