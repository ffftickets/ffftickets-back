"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AmazonS3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonS3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const AWS = require("aws-sdk");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
let AmazonS3Service = AmazonS3Service_1 = class AmazonS3Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AmazonS3Service_1.name);
        this.s3 = new AWS.S3({ region: this.configService.get('AWS_S3_BUCKET_REGION'), credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            } });
        this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    }
    async uploadBase64(body) {
        try {
            const imageName = (0, uuid_1.v4)();
            const imageData = body.image.includes('data:')
                ? body.image.split(',')[1]
                : body.image;
            const params = {
                Bucket: this.bucketName,
                Key: `${body.route}/${imageName}`,
                Body: Buffer.from(imageData, 'base64'),
                ContentType: 'image/jpeg',
            };
            const result = await this.s3.upload(params).promise();
            const imageUrl = result.Location;
            return { imageUrl };
        }
        catch (error) {
            this.logger.error('Error al cargar la imagen:', error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async deleteImageByUrl(imageUrl) {
        try {
            const decodedUrl = decodeURIComponent(imageUrl);
            const startIndex = decodedUrl.indexOf(`/${this.bucketName}/`);
            if (startIndex === -1) {
                throw new common_1.BadRequestException('El enlace proporcionado no es válido.');
            }
            const imagePath = decodedUrl.substring(startIndex + this.bucketName.length + 2, decodedUrl.indexOf('?'));
            const params = {
                Bucket: this.bucketName,
                Key: imagePath,
            };
            await this.s3.deleteObject(params).promise();
            this.logger.log('Imagen eliminada correctamente.');
            return true;
        }
        catch (error) {
            this.logger.error('Error al eliminar la imagen:', error);
            return false;
        }
    }
};
AmazonS3Service = AmazonS3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AmazonS3Service);
exports.AmazonS3Service = AmazonS3Service;
//# sourceMappingURL=amazon-s3.service.js.map