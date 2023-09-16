import { utcToZonedTime } from 'date-fns-tz';
import { User } from 'src/user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('license')
export class License extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp',  nullable: false })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @Column({ type: 'varchar', length: 75, nullable: false })
  institution: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  account_type: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  account_number: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  document: string;

  @ManyToOne((_) => User, (user) => user.licenseUser)
  user: User;

  @ManyToOne(() => User, (user) => user.licenseAdmin)
  userAdmin: User;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

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
