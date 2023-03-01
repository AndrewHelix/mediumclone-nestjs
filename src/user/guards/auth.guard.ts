import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ExpressRequest } from 'types/expressRequestInterface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (request.user) {
      return true;
    }
    console.log(request.user);
    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
