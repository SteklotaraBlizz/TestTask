import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MainException } from '../exceptions/main.exception';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  async fillTable() {
    for (let i = 0; i < 400; i += 5) {
      const data = await this.findClients(5, i);
      const statuses = await this.findStatuses(i + 1);

      data[0].status = statuses[0].status;
      data[1].status = statuses[1].status;
      data[2].status = statuses[2].status;
      data[3].status = statuses[3].status;
      data[4].status = statuses[4].status;

      await this.userRepository.save(data);
    }
  }

  async findClients(limit: number, offset: number) {
    const token = await this.authService.getLatestToken();
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://94.103.91.4:5000/clients?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `${token.token}`,
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw MainException.internalRequestError(
        `Ошибка обработки HTTP-запроса: ${error}`,
      );
    }
  }

  async findStatuses(firstId: number) {
    const token = await this.authService.getLatestToken();
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://94.103.91.4:5000/clients',
          {
            userIds: [
              firstId,
              firstId + 1,
              firstId + 2,
              firstId + 3,
              firstId + 4,
            ],
          },
          {
            headers: {
              Authorization: `${token.token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw MainException.internalRequestError(
        `Ошибка обработки HTTP-запроса: ${error}`,
      );
    }
  }

  async findAllClients() {
    return this.userRepository.find();
  }
}
