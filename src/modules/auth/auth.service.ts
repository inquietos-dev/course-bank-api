import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/classes/user.class';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const email = username;
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  public async login(user): Promise<any> {
    const payload = { username: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
