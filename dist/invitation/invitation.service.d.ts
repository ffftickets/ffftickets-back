import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
export declare class InvitationService {
    create(createInvitationDto: CreateInvitationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInvitationDto: UpdateInvitationDto): string;
    remove(id: number): string;
}
