import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public gender: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public address: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public city: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public phone: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256, nullable: true })
  public status: string;
}
