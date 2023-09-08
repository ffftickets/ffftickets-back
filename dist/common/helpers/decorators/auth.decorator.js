"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nest_access_control_1 = require("nest-access-control");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, nest_access_control_1.ACGuard), (0, nest_access_control_1.UseRoles)(...roles), (0, swagger_1.ApiBearerAuth)());
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map