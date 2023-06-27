import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loginLogs' })
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  blockStatus: string;

  @Column({ type: 'json', nullable: true })
  ipDetail: IpDetails;

  @Column({ type: 'json', nullable: true })
  userAgent: UserAgent;

  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

export interface Browser {
  name: string;
  version: string;
  major: string;
}

export interface Engine {
  name: string;
  version: string;
}

export interface Os {
  name: string;
  version: string;
}

export interface Device {
  model: string;
  type: string;
  vendor: string;
}

export interface Cpu {
  architecture: string;
}

export interface UserAgent {
  ua: string;
  browser: Browser | null;
  engine: Engine | null;
  os: Os | null;
  device: Device | null;
  cpu: Cpu | null;
}
export interface IpDetails {
  status: string | null;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  regionName: string | null;
  city: string | null;
  zip: string | null;
  lat: number | null;
  lon: number | null;
  timezone: string | null;
  isp: string | null;
  org: string | null;
  as: string | null;
  query: string | null;
}
