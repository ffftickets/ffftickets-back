"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_mail_dto_1 = require("./create-mail.dto");
class UpdateMailDto extends (0, swagger_1.PartialType)(create_mail_dto_1.CreateMailDto) {
}
exports.UpdateMailDto = UpdateMailDto;
//# sourceMappingURL=update-mail.dto.js.map