import 'reflect-metadata'; // Required for typedi
import express from 'express';
import { initializeDIContainer } from './infrastructure/di/di.container';
import { AppModule } from './app.module';
import { config } from './infrastructure/config/config';
import { loggingMiddleware } from './infrastructure/middlewares/logging.middleware';
import logger from './infrastructure/logging/logger';

const bootstrap = async () => {
    // Initialize the DI container
    await initializeDIContainer();

    const app = express();
    const PORT = config.port;
    const cors = require('cors');

    app.use(cors());

    app.use(loggingMiddleware);

    const appModule = new AppModule(app);
    appModule.init();

    app.listen(PORT, () => {
        logger.info(`Server is running on port:${PORT}`);
    });
};

bootstrap().catch((err) => {
    logger.error('Error during application startup:', err);
});
