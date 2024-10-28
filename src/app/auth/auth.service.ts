import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Sign-up logic
  async signUp(
    username: string,
    password: string,
    email?: string,
  ): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const user = this.userRepo.create({ username, password, email });
    await user.hashPassword();
    return this.userRepo.save(user);
  }

  // Login logic
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
