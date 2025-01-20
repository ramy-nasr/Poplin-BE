"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = loggingMiddleware;
const logger_1 = __importDefault(require("../logging/logger")); // Replace with your logger setup
function loggingMiddleware(req, res, next) {
    const startTime = Date.now(); // Record the start time of the request
    // Log the incoming request details
    logger_1.default.info(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl} Body: ${JSON.stringify(req.body)}`);
    // Attach a listener to log details after the response is sent
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger_1.default.info(`[${new Date().toISOString()}] Completed Response: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    // Catch errors during request handling
    try {
        next(); // Pass control to the next middleware or route handler
    }
    catch (error) {
        const duration = Date.now() - startTime;
        // Log error details
        if (error instanceof Error) {
            logger_1.default.error(`[${new Date().toISOString()}] Error: ${error.message} Stack: ${error.stack} Request: ${req.method} ${req.originalUrl} Duration: ${duration}ms`);
        }
        else {
            logger_1.default.error(`[${new Date().toISOString()}] Unknown Error: ${JSON.stringify(error)} Request: ${req.method} ${req.originalUrl} Duration: ${duration}ms`);
        }
        // Forward the error to the next error-handling middleware
        next(error);
    }
}
