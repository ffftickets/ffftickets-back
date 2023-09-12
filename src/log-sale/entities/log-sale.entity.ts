import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActionSale } from '../enum/sale-action.enum';

@Schema({ collection: 'log_sale' })
export class LogSale extends Document {
  @Prop({ enum: ActionSale, required: false }) // Utiliza el decorador @Prop y especifica el tipo y requerimiento
  action?: string;

  @Prop({ required: false })
  user?: string;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  data: any;
  

  @Prop({ type: Object })  // No es necesario especificar el tipo ya que es 'json' por defecto en MongoDB
  ipDetail?: any;

  @Prop({ type: Object }) // No es necesario especificar el tipo ya que es 'json' por defecto en MongoDB
  userAgent?: any;
}

export const LogSaleSchema = SchemaFactory.createForClass(LogSale);
