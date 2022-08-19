import express, { Application } from "express";
import MONGO from "./config";
import dotenv from 'dotenv'
import Routes from "./routes";
import mongoose from "mongoose";
import logging from "./config/logging";
import cors from 'cors'

dotenv.config()

/** Connect to Mongo */
mongoose.connect(MONGO.url, MONGO.options)
.then(() => {
    logging.info(NAMESPACE, 'Mongo Connected');
})
.catch((error) => {
    logging.error(NAMESPACE, error.message, error);
});

const NAMESPACE = 'Server';
const app: Application = express();

/** Cors Setup */
app.use(cors())

/** Body parsing Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
app.use('/', Routes);

/** Error handling */
app.use((_, res, __) => {
    const error = new Error('API Route Was Not Found');
    return res.status(404).json({
        error,
        status:404,
        message: error.message,
    });
});

export default app
