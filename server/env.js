import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV,
    key: process.env.STRIPE_KEY
}
