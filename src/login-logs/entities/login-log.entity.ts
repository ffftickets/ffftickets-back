import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Document } from 'mongoose';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

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

  @Prop({ type:String })
  createdAt: String;

  @Prop({ type:String })
  updatedAt: String;


}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);
LoginLogSchema.pre<LoginLog>('save', async function (next) {
 
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);
  
    const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss'; // Formato deseado (por ejemplo, "2023-09-16 15:48:00")
    this.createdAt = format(fechaActualEcuador, formatoFechaHora);
    this.updatedAt = format(fechaActualEcuador, formatoFechaHora);
  
    next();
});


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
