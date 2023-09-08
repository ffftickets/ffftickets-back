"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocalityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_locality_dto_1 = require("./create-locality.dto");
class UpdateLocalityDto extends (0, swagger_1.PartialType)(create_locality_dto_1.CreateLocalityDto) {
}
exports.UpdateLocalityDto = UpdateLocalityDto;
//# sourceMappingURL=update-locality.dto.js.map