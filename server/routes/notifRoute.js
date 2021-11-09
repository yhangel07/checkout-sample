import express from 'express';
import { checkoutSuccess } from '../controllers/checkoutController';

const router = express.Router();

router.get('/order/success', checkoutSuccess);

export default router;
