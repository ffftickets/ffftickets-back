import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { EventType } from 'src/event-type/entities/event-type.entity';
import { User } from 'src/user/entities/user.entity';
import { EventStatus } from '../emun/status-event.enum';
import { Localities } from 'src/localities/entities/localities.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { EventPromoter } from 'src/event-promoter/entities/event-promoter.entity';
import { PaymentMethod } from '../emun/payment-method.enum';

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => User, (user) => user.event)
  user: User;

  @OneToMany((_) => Localities, (location) => location.event)
  localities: Localities;

  @Column({ type: 'varchar', default: '', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  event_date: Date;

  @Column({ type: 'time', nullable: false })
  hour: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  province: string;

  @Column({ type: 'varchar', nullable: false })
  geo_location: string;

  @Column({ type: 'varchar', nullable: true })
  poster: string;

  @Column({ type: 'simple-array', nullable: true })
  event_gallery: string[];

  @Column({ type: 'simple-array', nullable: true })
  informative_gallery: string[];

  @Column({ type: 'varchar', nullable: true })
  courtesy_ticket: string;

  @Column({ type: 'varchar', nullable: true })
  ruc: string;

  @Column({ type: 'varchar', nullable: true })
  municipal_authorization: string;

  @Column({ type: 'varchar', nullable: true })
  issuance_authorization: string;

  @Column({ type: 'varchar', nullable: true, default: 'Dirección' })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  capacity_authorization: string;

  @Column({ type: 'bool', default: false })
  isActive: boolean;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.ACTIVE })
  status: string;

  @ManyToOne((_) => EventType, (eventType) => eventType.event)
  event_type: EventType;

  @Column({ type: 'simple-array', nullable: true })
  past_events: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((_) => Sale, (sale) => sale.event)
  sale: Sale;

  @OneToMany((_) => EventPromoter, (eventPromoter) => eventPromoter.event)
  promoter: EventPromoter;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 })
  commission: number;

  @Column('simple-array')
  payment_methods: PaymentMethod[];
  
  @Column({ type: 'bool', nullable: false, default: true })
  iva: boolean;
}
