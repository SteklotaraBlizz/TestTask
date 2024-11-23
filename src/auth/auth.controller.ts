import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { AuthRequest } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Авторизация')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('registration')
  async auth(@Body() req: AuthRequest) {
    return this.service.signUp(req);
  }

  @Post('login')
  async login(@Body() req: AuthRequest) {
    return this.service.login(req);
  }
}
