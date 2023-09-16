import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Document } from 'mongoose';
import { Sale } from 'src/sales/entities/sale.entity';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

@Schema({ collection: 'log_pay_cards' })
export class CreateLogPayCard extends Document {
  @Prop({ required: true })
  id_transaccion: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  cardType: string;

  @Prop({ required: true })
  cardIssuer: string;

  @Prop({ required: true })
  cardInfo: string;

  @Prop({ required: true })
  clientID: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  fecha: string;

  @Prop({ required: true })
  acquirer: string;

  @Prop({ required: true })
  deferred: number;

  @Prop({ required: true })
  interests: string;

  @Prop({ required: true })
  interestValue: number;

  @Prop({ required: true })
  amountWoTaxes: string;

  @Prop({ required: true })
  amountWTaxes: string;

  @Prop({ required: true })
  taxesValue: string;

  @Prop({ required: true })
  amountAuthorized: number;

  @Prop()
  authorizationNumber: string;

  @Prop({ required: true })
  tipoPago: string;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  ipDetail: any;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  userAgent: any;

  @Prop({ type: String }) // Especifica el tipo de datos como Date
  createdAt: String;

  @Prop({ type: String}) // Especifica el tipo de datos como Date
  updatedAt: String;

  @Prop({ type: Object }) // Define la relación con el modelo Sale
  sale: any;


}

export const CreateLogPayCardSchema = SchemaFactory.createForClass(CreateLogPayCard);



CreateLogPayCardSchema.pre<CreateLogPayCard>('save', async function (next) {
  const zonaHorariaEcuador = 'America/Guayaquil';
  const fechaActualUTC = new Date();
  const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);

  const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss'; // Formato deseado (por ejemplo, "2023-09-16 15:48:00")
  this.createdAt = format(fechaActualEcuador, formatoFechaHora);
  this.updatedAt = format(fechaActualEcuador, formatoFechaHora);

  next();
});