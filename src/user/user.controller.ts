import { Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post('status')
  async getStatuses(@Query('id') id: number) {
    return this.userService.findStatuses(id);
  }
}
