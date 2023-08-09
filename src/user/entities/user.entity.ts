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
import { Sale } from 'src/sales/entities/sale.entity';
import { EventPromoter } from 'src/event-promoter/entities/event-promoter.entity';
import { IdentificationType } from '../emun/identification-type.enum';
import { FreeTicket } from 'src/free-tickets/entities/free-ticket.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '', nullable: false })
  email:string;

  @Column({ type: 'varchar', nullable: false })
  password?: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;
 
  @Column({ type: 'varchar',  nullable: false })
  identification: string;

  @Column({
    type: 'enum',
    enum: IdentificationType,
    default: IdentificationType.CEDULA,
  })
  identificationType: string;

  @Column({ type: 'varchar',  nullable: true })
  province?: string;

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @Column({ type: 'varchar',  nullable: true })
  city?: string;

  @Column({ type: 'varchar',  nullable: true })
  address?: string;

  @Column({ type: 'varchar',  nullable: true })
  birthdate?: string;

  @Column({ type: 'enum', enum: Gender,nullable:true })
  gender: string;

  @OneToMany((_) => License, (license) => license.user)
  licenseUser: License;

  @OneToMany((_) => Event, (event) => event.user)
  event: Event;

  @OneToMany((_) => License, (license) => license.userAdmin)
  licenseAdmin: License;

  @OneToMany((_) => Sale, (sale) => sale.promoter)
  salePromoter: Sale;

  @OneToMany((_) => Sale, (sale) => sale.customer)
  saleCustomer: Sale;

  @Column({ type: 'simple-array' })
  roles: string[];

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({ type: 'bool', default: true })
  terms: boolean;

  @OneToMany((_) => EventPromoter, (eventPromoter) => eventPromoter.promoter)
  eventPromoter: EventPromoter;

  @CreateDateColumn({ name: 'last_login', type: 'timestamp' })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((_) => FreeTicket, (free) => free.user)
  free_ticket: FreeTicket;

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
    /*  const identificationExist = await User.findOne({
      where: { identification: this.identification },
    });

    if (identificationExist) {
      throw new ConflictException(
        'El numero de identificación ya se encuentra registrado',
      );
    } */
  }
}
