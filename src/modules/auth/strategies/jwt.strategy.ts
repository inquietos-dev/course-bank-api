import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<any> {
    if (
      !(await this.authService.isValidJWT(
        request.headers.authorization.replace('bearer', '').trim(),
      ))
    ) {
      throw new UnauthorizedException('Token not valid');
    }
    return {
      userId: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
