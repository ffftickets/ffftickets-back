"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpDetailsInterceptor = void 0;
const UAParser = require("ua-parser-js");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const requestIp = require("request-ip");
let IpDetailsInterceptor = class IpDetailsInterceptor {
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        request.headers['accept-version'] = '1.1.0';
        const parser = new UAParser(request.headers['user-agent']);
        const parserResults = parser.getResult();
        request.ua = parserResults;
        const ip = requestIp.getClientIp(request);
        try {
            const response = await axios_1.default.get(`http://ip-api.com/json/${ip}`);
            request['ip-details'] = response.data;
        }
        catch (error) {
            console.log('Error: ', error);
        }
        return next.handle();
    }
};
IpDetailsInterceptor = __decorate([
    (0, common_1.Injectable)()
], IpDetailsInterceptor);
exports.IpDetailsInterceptor = IpDetailsInterceptor;
//# sourceMappingURL=ip-details.interceptor.js.map