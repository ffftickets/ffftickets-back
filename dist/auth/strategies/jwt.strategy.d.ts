import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private config;
    constructor(usersService: UserService, config: ConfigService);
    validate(payload: any): Promise<import("../../user/entities/user.entity").User>;
}
export {};
