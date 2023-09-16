
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
  import { Event } from 'src/event/entities/event.entity';
import { utcToZonedTime } from 'date-fns-tz';
  @Entity('event-type')
  export class EventType extends BaseEntity {
     
    @PrimaryGeneratedColumn()
    id: number; 
  
    @Column({ type: 'varchar', default: '', nullable: false })
    name:string;
  
    @Column({ type: 'bool', default:true, nullable: false })
    isActive:boolean;
  

    @OneToMany((_) => Event, (event) => event.event_type)
    event: Event;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  

    @BeforeUpdate()
    async eventTypeExist() {
        const eventTypeExist = await EventType.findOne({
            where: { name: this.name }
          });
          if (eventTypeExist) {
            throw new ConflictException(
              'Ya existe el tipo de evento',
            );
          }
      
    }
  
   
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
  