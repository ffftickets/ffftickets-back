/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export declare class LoginLog extends Document {
    email: string;
    blockStatus: string;
    ipDetail: IpDetails;
    userAgent: UserAgent;
    isCorrect: boolean;
    createdAt: String;
    updatedAt: String;
}
export declare const LoginLogSchema: import("mongoose").Schema<LoginLog, import("mongoose").Model<LoginLog, any, any, any, Document<unknown, any, LoginLog> & LoginLog & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoginLog, Document<unknown, {}, LoginLog> & LoginLog & {
    _id: import("mongoose").Types.ObjectId;
}>;
export interface Browser {
    name: string;
    version: string;
    major: string;
}
export interface Engine {
    name: string;
    version: string;
}
export interface Os {
    name: string;
    version: string;
}
export interface Device {
    model: string;
    type: string;
    vendor: string;
}
export interface Cpu {
    architecture: string;
}
export interface UserAgent {
    ua: string;
    browser: Browser | null;
    engine: Engine | null;
    os: Os | null;
    device: Device | null;
    cpu: Cpu | null;
}
export interface IpDetails {
    status: string | null;
    country: string | null;
    countryCode: string | null;
    region: string | null;
    regionName: string | null;
    city: string | null;
    zip: string | null;
    lat: number | null;
    lon: number | null;
    timezone: string | null;
    isp: string | null;
    org: string | null;
    as: string | null;
    query: string | null;
}
