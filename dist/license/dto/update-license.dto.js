"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLicenseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_license_dto_1 = require("./create-license.dto");
class UpdateLicenseDto extends (0, swagger_1.PartialType)(create_license_dto_1.CreateLicenseDto) {
}
exports.UpdateLicenseDto = UpdateLicenseDto;
//# sourceMappingURL=update-license.dto.js.map