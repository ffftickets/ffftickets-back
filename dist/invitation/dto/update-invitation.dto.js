"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvitationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_invitation_dto_1 = require("./create-invitation.dto");
class UpdateInvitationDto extends (0, swagger_1.PartialType)(create_invitation_dto_1.CreateInvitationDto) {
}
exports.UpdateInvitationDto = UpdateInvitationDto;
//# sourceMappingURL=update-invitation.dto.js.map