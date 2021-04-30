import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { TokenEntity } from '../database/entities/token.entity';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Get('/logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(
      req.headers.authorization.replace('bearer', '').trim(),
    );
  }
}
