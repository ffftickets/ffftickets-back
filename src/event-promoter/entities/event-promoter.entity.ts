import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
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
import { EventPromoterStatus } from '../emun/status-event.enum';
import { utcToZonedTime } from 'date-fns-tz';

@Entity('event-promoter')
export class EventPromoter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_) => Event, (event) => event.promoter)
  event: Event;

  @ManyToOne((_) => User, (user) => user.eventPromoter)
  promoter: User;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: EventPromoterStatus,
    default: EventPromoterStatus.ACTIVE,
  })
  status: string;

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
