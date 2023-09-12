"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_event_type_dto_1 = require("./create-event-type.dto");
class UpdateEventTypeDto extends (0, swagger_1.PartialType)(create_event_type_dto_1.CreateEventTypeDto) {
}
exports.UpdateEventTypeDto = UpdateEventTypeDto;
//# sourceMappingURL=update-event-type.dto.js.map