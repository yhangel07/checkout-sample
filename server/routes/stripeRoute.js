import express from 'express';
import { checkoutController, checkoutSuccess } from '../controllers/checkoutController';

const router = express.Router();

router.post('/checkout', checkoutController);
router.get('/order/success', checkoutSuccess);

export default router;
