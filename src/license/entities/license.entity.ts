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
  startDate: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  endDate: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  institution: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  accountType: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  accountNumber: string;

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

  /*     @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (!this.password) {
        return;
      }
      this.password = await hash(this.password, 10);
    }
  
    @BeforeInsert()
    async validatePlate() {
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
    } */
}
