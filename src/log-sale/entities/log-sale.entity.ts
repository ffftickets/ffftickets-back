import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActionSale } from '../enum/sale-action.enum';
import { BeforeInsert } from 'typeorm';
import { format, utcToZonedTime } from 'date-fns-tz';

@Schema({ collection: 'log_sale' })
export class LogSale extends Document {
  @Prop({ type: String, required: false })
  action?: string;

  @Prop({ required: false })
  user?: string;

  @Prop({ type: Object }) // Especifica el tipo de datos como Object
  data: any;
  

  @Prop({ type: Object })  // No es necesario especificar el tipo ya que es 'json' por defecto en MongoDB
  ipDetail?: any;

  @Prop({ type: Object }) // No es necesario especificar el tipo ya que es 'json' por defecto en MongoDB
  userAgent?: any;
  
  @Prop({ type: String}) // Especifica el tipo de datos como Date
  createdAt: String;

  @Prop({ type: String  }) // Especifica el tipo de datos como Date
  updatedAt: String;

}

export const LogSaleSchema = SchemaFactory.createForClass(LogSale);


LogSaleSchema.pre<LogSale>('save', async function (next) {
  const zonaHorariaEcuador = 'America/Guayaquil';
  const fechaActualUTC = new Date();
  const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);

  const formatoFechaHora = 'yyyy-MM-dd HH:mm:ss'; // Formato deseado (por ejemplo, "2023-09-16 15:48:00")
  this.createdAt = format(fechaActualEcuador, formatoFechaHora);
  this.updatedAt = format(fechaActualEcuador, formatoFechaHora);

  next();
});
