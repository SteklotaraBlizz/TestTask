import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('clients')
@ApiTags('Клиенты')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async fillTable() {
    return this.userService.fillTable();
  }

  @Post('status')
  async getStatuses(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findStatuses(id);
  }

  @Get()
  async getClients(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.userService.findClients(limit, offset);
  }

  @Get('all')
  async getAllClients() {
    return this.userService.findAllClients();
  }
}
