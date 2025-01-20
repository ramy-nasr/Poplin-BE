"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Required for typedi
const express_1 = __importDefault(require("express"));
const di_container_1 = require("./infrastructure/di/di.container");
const app_module_1 = require("./app.module");
const config_1 = require("./infrastructure/config/config");
const logging_middleware_1 = require("./infrastructure/middlewares/logging.middleware");
const logger_1 = __importDefault(require("./infrastructure/logging/logger"));
const bootstrap = async () => {
    // Initialize the DI container
    await (0, di_container_1.initializeDIContainer)();
    const app = (0, express_1.default)();
    const PORT = config_1.config.port;
    const cors = require('cors');
    app.use(cors());
    app.use(logging_middleware_1.loggingMiddleware);
    const appModule = new app_module_1.AppModule(app);
    appModule.init();
    app.listen(PORT, () => {
        logger_1.default.info(`Server is running on port:${PORT}`);
    });
};
bootstrap().catch((err) => {
    logger_1.default.error('Error during application startup:', err);
});
