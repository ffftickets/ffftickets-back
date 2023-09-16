import { Localities } from 'src/localities/entities/localities.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../enum/ticket-status.enum';
import { User } from 'src/user/entities/user.entity';
import { utcToZonedTime } from 'date-fns-tz';

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
