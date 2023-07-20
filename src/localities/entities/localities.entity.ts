import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocaliteStatus } from '../enum/localite-status.enum';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { FreeTicket } from 'src/free-tickets/entities/free-ticket.entity';

@Entity('localities')
export class Localities {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.localities)
  event: Event;

  @OneToMany((_) => FreeTicket, (free) => free.locality)
  free_ticket: FreeTicket;
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ type: 'int',  default: 0 })
  sold: number;

  @Column({ type: 'varchar', nullable: false })
  photo: string;

  @Column({ type: 'enum',enum: LocaliteStatus, default: LocaliteStatus.ACTIVE })
  status: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
  
  @OneToMany((_) => Ticket, (ticket) => ticket.locality)
  ticket: Ticket;
}
