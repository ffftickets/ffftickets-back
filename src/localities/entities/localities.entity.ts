import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocaliteStatus } from '../emun/localite-status.enum';

@Entity('localities')
export class Localities {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.localities)
  event: Event;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ type: 'int',  default: 0 })
  sold: number;

  @Column({ type: 'varchar', nullable: false })
  ticket: string;

  @Column({ type: 'enum',enum: LocaliteStatus, default: LocaliteStatus.ACTIVE })
  status: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
