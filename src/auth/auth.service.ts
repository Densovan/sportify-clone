import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private JwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: this.JwtService.sign({ payload }),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
