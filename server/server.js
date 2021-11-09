import express from 'express';
import 'babel-polyfill';
import env from './env.js';
import compression from 'compression';
import cors from 'cors';

// routes
import stripeRoute from './routes/stripeRoute';
import notifRoute from './routes/notifRoute';

const isProduction = process.env.NODE_ENV === 'production';

const whitelist = [
    'http://localhost:4200',
    'http://localhost:3000'
];

const corsOption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS, origin: ${origin}`))
        }
    }
};


const app = express();
app.use(compression());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.enable('trust proxy');

app.use("/api", stripeRoute);
app.use("/notification", notifRoute);


app.get('/',(req, res) => res.send('Welcome to my Sample App'));

app.listen(env.port).on('listening', () => {
    console.log(`running server on port ${env.port}`);
});


export default app;
