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
} from 'typeorm';
import { hash } from 'bcryptjs';

import { AppRoles } from 'src/app.roles';
import { ConflictException } from '@nestjs/common';
import { Gender, UserStatus } from 'src/core/enums';
import { License } from 'src/license/entities/license.entity';
import { Event } from 'src/event/entities/event.entity';

@Entity('user')
export class User extends BaseEntity {
   
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 100, default: '', nullable: false })
  email;

  @Column({ type: 'varchar',length: 500, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 13, nullable: false })
  identification: string;

  @Column({ type: 'varchar', length: 35, nullable: false })
  province: string;

  @Column({ type: 'varchar', length: 35, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  birthdate:string;

  @Column({ type: 'enum', enum: Gender})
  gender:string;
  
  @OneToMany((_) => License, (license) => license.user)
  licenseUser: License;

  @OneToMany((_) => Event, (event) => event.user)
  event: Event;

  @OneToMany((_) => License, (license) => license.user_admin)
  licenseAdmin: License;

  @Column({ type: 'simple-array' })
  roles: string[];

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'last_login', type: 'timestamp' })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;


  @BeforeUpdate()
  @BeforeInsert()
  updateTimeCreated() {
    // Establecer la zona horaria de Ecuador en la fecha updatedAt
    const currentTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Guayaquil',
    });
    this.createdAt = new Date(currentTimestamp);
  }

  @BeforeUpdate()
  @BeforeInsert()
  updateTimestamp() {
    // Establecer la zona horaria de Ecuador en la fecha updatedAt
    const currentTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Guayaquil',
    });
    this.updatedAt = new Date(currentTimestamp);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  convertEmailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }

  @BeforeInsert()
  async ValidateEmail() {
    const emailExist = await User.findOne({
      where: { email: this.email },
    });

    if (emailExist) {
      throw new ConflictException('El correo ya se encuentra registrado');
    }
    const identificationExist = await User.findOne({
      where: { identification: this.identification },
    });

    if (identificationExist) {
      throw new ConflictException(
        'El numero de identificación ya se encuentra registrado',
      );
    }
  }
}
