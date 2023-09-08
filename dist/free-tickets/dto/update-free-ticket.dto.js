"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFreeTicketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_free_ticket_dto_1 = require("./create-free-ticket.dto");
class UpdateFreeTicketDto extends (0, swagger_1.PartialType)(create_free_ticket_dto_1.CreateFreeTicketDto) {
}
exports.UpdateFreeTicketDto = UpdateFreeTicketDto;
//# sourceMappingURL=update-free-ticket.dto.js.map