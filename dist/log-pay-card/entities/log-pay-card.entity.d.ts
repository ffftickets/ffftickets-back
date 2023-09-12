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
export declare class CreateLogPayCard extends Document {
    id_transaccion: string;
    token: string;
    amount: number;
    cardType: string;
    cardIssuer: string;
    cardInfo: string;
    clientID: string;
    clientName: string;
    state: string;
    fecha: string;
    acquirer: string;
    deferred: number;
    interests: string;
    interestValue: number;
    amountWoTaxes: string;
    amountWTaxes: string;
    taxesValue: string;
    amountAuthorized: number;
    authorizationNumber: string;
    tipoPago: string;
    ipDetail: any;
    userAgent: any;
    createdAt: Date;
    updatedAt: Date;
    sale: any;
}
export declare const CreateLogPayCardSchema: import("mongoose").Schema<CreateLogPayCard, import("mongoose").Model<CreateLogPayCard, any, any, any, Document<unknown, any, CreateLogPayCard> & CreateLogPayCard & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CreateLogPayCard, Document<unknown, {}, CreateLogPayCard> & CreateLogPayCard & {
    _id: import("mongoose").Types.ObjectId;
}>;
