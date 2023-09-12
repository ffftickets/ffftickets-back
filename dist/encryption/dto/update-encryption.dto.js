"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEncryptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_encryption_dto_1 = require("./create-encryption.dto");
class UpdateEncryptionDto extends (0, swagger_1.PartialType)(create_encryption_dto_1.CreateEncryptionDto) {
}
exports.UpdateEncryptionDto = UpdateEncryptionDto;
//# sourceMappingURL=update-encryption.dto.js.map