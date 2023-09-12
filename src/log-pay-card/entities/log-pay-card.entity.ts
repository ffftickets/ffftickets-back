import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Sale } from 'src/sales/entities/sale.entity';

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

  @Prop({ type: Date, default: Date.now }) // Especifica el tipo de datos como Date
  createdAt: Date;

  @Prop({ type: Date, default: Date.now }) // Especifica el tipo de datos como Date
  updatedAt: Date;

  @Prop({ type: Object }) // Define la relación con el modelo Sale
  sale: any;
}

export const CreateLogPayCardSchema = SchemaFactory.createForClass(CreateLogPayCard);
