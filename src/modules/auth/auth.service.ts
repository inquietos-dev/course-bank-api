import { Model } from 'mongoose';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/classes/user.class';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenEntity } from '../database/entities/token.entity';
import { Token } from '../mongo/interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('TOKEN_MODEL')
    private tokenModel: Model<Token>,
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
    const access_token = this.jwtService.sign(payload);
    const token = new TokenEntity();
    token.token = access_token;
    await new this.tokenModel({ token }).save();
    return {
      access_token,
    };
  }

  public async logout(token) {
    console.log('token', token);
    const tokenEntity = await this.tokenModel.findOne({ token });
    if (tokenEntity) {
      await tokenEntity.delete();
    }
  }

  public async isValidJWT(token) {
    const exists = await this.tokenModel.findOne({ token });
    return !!exists;
  }
}
