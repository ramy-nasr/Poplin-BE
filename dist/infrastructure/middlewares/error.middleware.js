"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = __importDefault(require("../logging/logger"));
function errorMiddleware(err, req, res, next) {
    logger_1.default.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred.' });
}
