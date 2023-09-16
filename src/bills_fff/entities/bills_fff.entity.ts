
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StatusBill } from '../enums/status-bill.dto';
import { Sale } from 'src/sales/entities/sale.entity';

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
}
