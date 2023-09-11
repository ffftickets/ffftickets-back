import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('log_mail')
export class MailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  receiver: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  
  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'json' })
  details: object;


  @Column({ type: 'json' })
  content: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
