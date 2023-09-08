import { Sale } from 'src/sales/entities/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'log_pay_cards' })
export class CreateLogPayCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  id_transaccion: string;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @Column({ type: 'varchar', nullable: false })
  cardType: string;

  @Column({ type: 'varchar', nullable: false })
  cardIssuer: string;

  @Column({ type: 'varchar', nullable: false })
  cardInfo: string;

  @Column({ type: 'varchar', nullable: false })
  clientID: string;

  @Column({ type: 'varchar', nullable: false })
  clientName: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  fecha: string;

  @Column({ type: 'varchar', nullable: false })
  acquirer: string;

  @Column({ type: 'decimal', nullable: false })
  deferred: number;

  @Column({ type: 'varchar', nullable: false })
  interests: string;

  @Column({ type: 'decimal', nullable: false })
  interestValue: number;

  @Column({ type: 'varchar', nullable: false })
  amountWoTaxes: string;

  @Column({ type: 'varchar', nullable: false })
  amountWTaxes: string;

  @Column({ type: 'varchar', nullable: false })
  taxesValue: string;

  @Column({ type: 'decimal', nullable: false })
  amountAuthorized: number;

  @Column({ type: 'varchar', nullable: true })
  authorizationNumber: string;

  @Column({ type: 'varchar', nullable: false })
  tipoPago: string;

  @Column({ type: 'json', nullable: true })
  ipDetail: any;

  @Column({ type: 'json', nullable: true })
  userAgent: any;

  @OneToOne(() => Sale, sale => sale.log)
  @JoinColumn({ name: 'saleId' })
  sale: Sale;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

}
