import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayTypes } from '../enum/pay-types.enum';
import { SaleStatus } from '../enum/sale-status.enum';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { CreateLogPayCard } from 'src/log-pay-card/entities/log-pay-card.entity';
import { BillsFff } from 'src/bills_fff/entities/bills_fff.entity';
import { utcToZonedTime } from 'date-fns-tz';
@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.sale)
  event: Event;

  @ManyToOne((_) => User, (user) => user.salePromoter)
  promoter: User;

  @ManyToOne((_) => User, (user) => user.saleCustomer)
  customer: any;

  @Column({ type: 'enum', enum: PayTypes, nullable: false })
  payType: string;

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.SOLD,
    nullable: false,
  })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  authorizationNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  transactionCode?: string;

  @Column({ type: 'varchar', nullable: true })
  transfer_photo?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  serviceValue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  catwalkCommission?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  promoterDiscount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 })
  total: number;

  @OneToMany((_) => Ticket, (ticket) => ticket.sale)
  tickets: Ticket;

  @Column({ type: 'timestamp', nullable: true })
  authorization_date: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
  //!Relacion con sales
  @OneToMany((_) => BillsFff, (bill) => bill.sale)
  bill: BillsFff;
  
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
