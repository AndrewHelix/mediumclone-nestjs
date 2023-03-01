import { Injectable } from '@nestjs/common/decorators';
import { NestMiddleware } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ExpressRequest } from 'types/expressRequestInterface';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, this.configService.get('SECRET'));
      const user = await this.userService.findById((decode as JwtPayload).id);
      req.user = user;
    } catch (error) {
      req.user = null;
      next();
    }
    next();
  }
}
