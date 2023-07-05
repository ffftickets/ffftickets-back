import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayTypes } from '../enum/pay-types.emun';
import { SaleStatus } from '../enum/sale-status.emun';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.sale)
  event: Event;

  @ManyToOne((_) => User, (user) => user.saleOrganizer)
  organizer: User;

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

  @Column({ type: 'double', nullable: false })
  serviceValue: number;

  @Column({ type: 'double', nullable: false })
  catwalkCommission: number;

  @Column({ type: 'double', nullable: true })
  promoterDiscount: number;

  @Column({ type: 'double', nullable: false })
  total: number;

  @OneToMany((_) => Ticket, (ticket) => ticket.sale)
  tickets: Ticket;

  @Column({ type: 'timestamp', nullable: true })
  authorization_date: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
