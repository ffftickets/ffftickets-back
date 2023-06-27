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

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne((_) => User, (user) => user.event)
  user: User;

  @Column({ type: 'varchar', default: '', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  eventDate:  Date;

  @Column({ type: 'time', nullable: false })
  hour:  string;

  @Column({ type: 'varchar', nullable: false })
  city:  string;

  @Column({ type: 'varchar', nullable: false })
  location:  string;

  @Column({ type: 'varchar', nullable: false })
  geoLocation:  string;

  @Column({ type: 'varchar', nullable: false })
  poster:  string;

  @Column({ type: 'varchar', nullable: false })
  imgTicket:  string;

  @Column({ type: 'varchar', nullable: false })
  ruc:  string;

  @Column({ type: 'varchar', nullable: false })
  municipalAuthorization:  string;

  @Column({ type: 'varchar', nullable: false })
  issuanceAuthorization:  string;

  @Column({ type: 'varchar', nullable: false })
  capacityAuthorization:  string;

  @Column({ type: 'bool', default: true, nullable: false })
  isActive: boolean;

  @ManyToOne((_) => EventType, (eventType) => eventType.event)
  eventType: EventType;


  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;


}
