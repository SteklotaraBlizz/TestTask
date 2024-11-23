import { Injectable } from '@nestjs/common';
import { AuthRequest } from './dto/auth.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MainException } from 'src/exceptions/main.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly httpService: HttpService,
  ) {}

  async signUp(request: AuthRequest) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://94.103.91.4:5000/auth/registration',
          {
            username: request.username,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      await this.createToken(response);
      return response.data;
    } catch (error) {
      throw MainException.internalRequestError(
        `Ошибка обработки HTTP-запроса: ${error}`,
      );
    }
  }

  async login(request: AuthRequest) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://94.103.91.4:5000/auth/login',
          {
            username: request.username,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      await this.createToken(response);
      return response.data;
    } catch (error) {
      throw MainException.internalRequestError(
        `Ошибка обработки HTTP-запроса: ${error}`,
      );
    }
  }

  async getLatestToken(): Promise<TokenEntity> {
    const latestToken = await this.tokenRepository
      .createQueryBuilder('tokens')
      .orderBy('tokens.createdAt', 'DESC')
      .take(1)
      .getOne();

    return latestToken;
  }

  private async createToken(
    response: AxiosResponse<any, { username: string }>,
  ) {
    return this.tokenRepository.save(
      this.tokenRepository.create({
        ...response.data,
      }),
    );
  }
}
