import { Localities } from 'src/localities/entities/localities.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../enum/ticket-status.enum';

@Entity('ticket')
export class Ticket {
  reduce(arg0: (acc: any, ticket: any) => any, arg1: {}) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => Sale, (sale) => sale.tickets)
  sale: Sale;

  @ManyToOne((_) => Localities, (locality) => locality.ticket)
  locality: Localities;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.ACTIVE,
    nullable: false,
  })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  qr: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
  map: any;
}
