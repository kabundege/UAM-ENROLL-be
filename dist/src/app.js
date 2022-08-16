"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./config/logging"));
dotenv_1.default.config();
/** Connect to Mongo */
mongoose_1.default.connect(config_1.default.url, config_1.default.options)
    .then(() => {
    logging_1.default.info(NAMESPACE, 'Mongo Connected');
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
const NAMESPACE = 'Server';
const app = (0, express_1.default)();
/** Body parsing Middleware */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
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
app.use('/', routes_1.default);
/** Error handling */
app.use((_, res, __) => {
    const error = new Error('API Route Was Not Found');
    return res.status(404).json({
        error,
        status: 404,
        message: error.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map