"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.log('status code in error middleware', statusCode);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Something went wrong'
    });
};
exports.errorHandler = errorHandler;
module.exports = { errorHandler: exports.errorHandler };
