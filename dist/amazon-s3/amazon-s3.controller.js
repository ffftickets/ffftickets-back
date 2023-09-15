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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonS3Controller = void 0;
const common_1 = require("@nestjs/common");
const amazon_s3_service_1 = require("./amazon-s3.service");
let AmazonS3Controller = class AmazonS3Controller {
    constructor(amazonS3Service) {
        this.amazonS3Service = amazonS3Service;
    }
};
AmazonS3Controller = __decorate([
    (0, common_1.Controller)('amazon-s3'),
    __metadata("design:paramtypes", [amazon_s3_service_1.AmazonS3Service])
], AmazonS3Controller);
exports.AmazonS3Controller = AmazonS3Controller;
//# sourceMappingURL=amazon-s3.controller.js.map