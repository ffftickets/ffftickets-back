
import { Sale } from 'src/sales/entities/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ActionSale } from '../enum/sale-action.enum';

@Entity({ name: 'log_sale' })
export class LogSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActionSale, nullable: false })
  action: string;

  @Column({ type: 'varchar', nullable: false })
  user: string;

  @Column({ type: 'json', nullable: false })
  data: any;
  

  @Column({ type: 'json', nullable: true })
  ipDetail: any;

  @Column({ type: 'json', nullable: true })
  userAgent: any;



}
