import { User } from 'src/user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity('license')
export class License extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 75, nullable: false })
  start_date: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  endDate: string;

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
  
  user_admin: User;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

}
