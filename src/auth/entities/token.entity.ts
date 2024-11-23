import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public readonly createdAt!: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: '512' })
  public token: string;
}
