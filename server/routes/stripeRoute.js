import express from 'express';
import { checkoutController } from '../controllers/checkoutController';

const router = express.Router();

router.post('/checkout', checkoutController);

export default router;
