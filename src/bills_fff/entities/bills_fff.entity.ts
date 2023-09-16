
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { StatusBill } from '../enums/status-bill.dto';
import { Sale } from 'src/sales/entities/sale.entity';
import { utcToZonedTime } from 'date-fns-tz';

@Entity('bills_fff')
export class BillsFff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => Sale, (sale) => sale.bill)
  sale: Sale;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  identification: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_o: number;

  @Column('decimal', { precision: 10, scale: 2 })
  iva_o: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_fff: number;

  @Column('decimal', { precision: 10, scale: 2 })
  iva_fff: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({type: 'enum', enum: StatusBill, default: StatusBill.PENDING})
  status: StatusBill;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
  @BeforeInsert()
  setCreatedAt() {
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);
    this.createdAt = fechaActualEcuador;
    this.updatedAt = fechaActualEcuador;
  }

  // Esta función se ejecuta antes de actualizar un registro
  @BeforeUpdate()
  setUpdatedAt() {
    const zonaHorariaEcuador = 'America/Guayaquil';
    const fechaActualUTC = new Date();
    const fechaActualEcuador = utcToZonedTime(fechaActualUTC, zonaHorariaEcuador);
    this.updatedAt = fechaActualEcuador;
  }
}
