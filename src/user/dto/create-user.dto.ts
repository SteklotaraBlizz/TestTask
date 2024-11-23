import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public username: string;
}
