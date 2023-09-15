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
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase/app");
const config_env_1 = require("../config/config.env");
const storage_1 = require("firebase/storage");
const uuid_1 = require("uuid");
const custom_error_helper_1 = require("../common/helpers/custom-error.helper");
const amazon_s3_service_1 = require("../amazon-s3/amazon-s3.service");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    constructor(configService, s3) {
        this.configService = configService;
        this.s3 = s3;
        this.firebaseConfig = {
            apiKey: this.configService.get(config_env_1.FIREBASE_API_KEY),
            authDomain: this.configService.get(config_env_1.FIREBASE_AUTH_DOMAIN),
            projectId: this.configService.get(config_env_1.FIREBASE_PROJECT_ID),
            storageBucket: this.configService.get(config_env_1.FIREBASE_STORAGE_BUCKET),
            messagingSenderId: this.configService.get(config_env_1.FIREBASE_MESSAGING_SENDER_ID),
            appId: this.configService.get(config_env_1.FIREBASE_APP_ID),
            measurementId: this.configService.get(config_env_1.FIREBASE_MEASUREMENT_ID),
        };
        this.firebaseApp = null;
        this.storageBucket = `gs://${this.firebaseConfig.storageBucket}`;
        this.logger = new common_1.Logger(FirebaseService_1.name);
        this.firebaseApp = (0, app_1.initializeApp)(this.firebaseConfig);
    }
    async uploadBase64(body) {
        try {
            this.s3.uploadBase64(body);
            const imageName = (0, uuid_1.v4)();
            const imageData = body.image.includes('data:')
                ? body.image.split(',')[1]
                : body.image;
            const storage = (0, storage_1.getStorage)(this.firebaseApp, this.storageBucket);
            const storageRef = (0, storage_1.ref)(storage, `${body.route}/${imageName}`);
            const result = await (0, storage_1.uploadString)(storageRef, imageData, 'base64', {
                contentType: 'image/jpeg',
            });
            const bucket = result.metadata.bucket;
            const imagePath = result.metadata.fullPath;
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(imagePath)}?alt=media`;
            return { imageUrl };
        }
        catch (error) {
            this.logger.error('Error al eliminar la imagen:', error);
            (0, custom_error_helper_1.customError)(error);
        }
    }
    async deleteImageByUrl(imageUrl) {
        const decodedUrl = decodeURIComponent(imageUrl);
        const startIndex = decodedUrl.indexOf('/o/');
        if (startIndex === -1) {
            throw new common_1.BadRequestException('El enlace proporcionado no es válido.');
        }
        const imagePath = decodedUrl.substring(startIndex + 3, decodedUrl.indexOf('?'));
        const storage = (0, storage_1.getStorage)();
        const imageRef = (0, storage_1.ref)(storage, imagePath);
        try {
            const data = await (0, storage_1.deleteObject)(imageRef);
            this.logger.log('Imagen eliminada correctamente.');
            return true;
        }
        catch (error) {
            this.logger.error('Error al eliminar la imagen:', error);
            return;
        }
    }
};
FirebaseService = FirebaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, amazon_s3_service_1.AmazonS3Service])
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map