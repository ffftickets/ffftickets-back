import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Document } from 'mongoose';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

@Schema({ collection: 'log_mail' })
export class MailLog extends Document {
  @Prop()
  receiver: string;

  @Prop()
  status: string;

  @Prop()
  subject: string;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  details: object;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  content: object;

  @Prop({ type: String }) // Especifica el tipo de datos como Date
  createdAt: String;

  @Prop({ type: String }) // Especifica el tipo de datos como Date
  updatedAt: String;
  

}

export const MailLogSchema = SchemaFactory.createForClass(MailLog);


MailLogSchema.pre<MailLog>('save', async function (next) {
  const zonaHorariaEcuador = 'America/Guayaquil';
  const fechaActualUTC = new Date();
  const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);

  const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss'; // Formato deseado (por ejemplo, "2023-09-16 15:48:00")
  this.createdAt = format(fechaActualEcuador, formatoFechaHora);
  this.updatedAt = format(fechaActualEcuador, formatoFechaHora);

  next();

  next();
});
