import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN = "ADMIN",
    ORGANIZER = "ORGANIZER",
    PROMOTER = "PROMOTER",
    CUSTOMER = "CUSTOMER"
}
export declare enum AppResource {
    USER = "USER",
    LICENSE = "LICENSE",
    EVENT_TYPE = "EVENT_TYPE",
    EVENT = "EVENT"
}
export declare const roles: RolesBuilder;
