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
import { User } from 'src/user/entities/user.entity';

@Entity('free-tickets')
export class FreeTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => Localities, (locality) => locality.free_ticket)
  locality: Localities;

  @ManyToOne((_) => User, (user) => user.free_ticket)
  user: User;

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
}
