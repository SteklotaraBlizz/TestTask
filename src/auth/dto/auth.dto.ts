﻿import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { CreateUserRequest } from 'src/user/dto/create-user.dto';

export class AuthRequest extends CreateUserRequest {}

export class LoginRequest {
  @IsDefined()
  @IsEmail()
  @IsString()
  @ApiProperty()
  public email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  public password: string;
}

export class AuthResponse {
  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
