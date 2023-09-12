import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
export declare class InvitationController {
    private readonly invitationService;
    constructor(invitationService: InvitationService);
    create(createInvitationDto: CreateInvitationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInvitationDto: UpdateInvitationDto): string;
    remove(id: string): string;
}
