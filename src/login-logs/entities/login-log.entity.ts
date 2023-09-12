import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'log_login' })
export class LoginLog extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  blockStatus: string;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  ipDetail: IpDetails;

   @Prop({ type: Object }) 
  userAgent: UserAgent;

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);



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
