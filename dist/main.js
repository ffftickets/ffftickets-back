"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_env_1 = require("./config/config.env");
const app_swagger_1 = require("./app.swagger");
const express_1 = require("express");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '150mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '150mb' }));
    app.enableCors();
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['https://ffftickets.com', 'http://localhost'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const config = app.get(config_1.ConfigService);
    const port = config.get(config_env_1.PORT);
    const nodeEnv = config.get(config_env_1.NODE_ENV);
    logger.log(`Running in ${nodeEnv} mode`);
    (0, app_swagger_1.initSwagger)(app);
    await app.listen(port);
    logger.log(`App running in ${await app.getUrl()}/api`);
    logger.log(await `Swagger running in http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map