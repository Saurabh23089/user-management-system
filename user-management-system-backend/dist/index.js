"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const config_1 = require("./config/config");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const configureRoutes_1 = __importDefault(require("./routes/configureRoutes"));
const rateLimiter_1 = require("./middlewares/rateLimiter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(rateLimiter_1.rateLimiter);
(0, dbConnection_1.connectDB)();
app.get('/', (_req, res) => {
    res.send('Welcome to the user management system backend');
});
app.get('/health', (_req, res) => {
    console.log('fafdh');
    res.status(200).send('Backend is healthy');
});
(0, configureRoutes_1.default)(app);
app.use(errorMiddleware_1.errorHandler);
app.listen(config_1.config.PORT, () => {
    console.log(`Server is listening on PORT ${config_1.config.PORT}`);
});
