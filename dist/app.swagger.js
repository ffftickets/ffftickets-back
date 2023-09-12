"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const initSwagger = (app, title, description) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(title || 'Api FFF Tickets')
        .setDescription(description || 'Documentación de la API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    const sortedPaths = Object.keys(document.paths).sort();
    const sortedDocument = Object.assign(Object.assign({}, document), { paths: sortedPaths.reduce((acc, key) => {
            acc[key] = document.paths[key];
            return acc;
        }, {}) });
    swagger_1.SwaggerModule.setup('/docs', app, sortedDocument);
};
exports.initSwagger = initSwagger;
//# sourceMappingURL=app.swagger.js.map