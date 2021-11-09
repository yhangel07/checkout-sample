import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env.js';
import compression from 'compression';

// routes
import stripeRoute from './routes/stripeRoute';

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
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.enable('trust proxy');

app.use("/api", cors(corsOption), stripeRoute);


app.get('/',(req, res) => res.send('Welcome to my Sample App'));

app.listen(env.port).on('listening', () => {
    console.log(`running server on port ${env.port}`);
});


export default app;
