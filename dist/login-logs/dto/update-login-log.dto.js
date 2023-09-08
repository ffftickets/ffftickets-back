"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoginLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_login_log_dto_1 = require("./create-login-log.dto");
class UpdateLoginLogDto extends (0, swagger_1.PartialType)(create_login_log_dto_1.CreateLoginLogDto) {
}
exports.UpdateLoginLogDto = UpdateLoginLogDto;
//# sourceMappingURL=update-login-log.dto.js.map