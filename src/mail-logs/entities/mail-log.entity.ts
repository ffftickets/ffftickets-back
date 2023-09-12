import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: Date, default: Date.now }) // Especifica el tipo de datos como Date
  createdAt: Date;

  @Prop({ type: Date, default: Date.now }) // Especifica el tipo de datos como Date
  updatedAt: Date;
}

export const MailLogSchema = SchemaFactory.createForClass(MailLog);
