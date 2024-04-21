import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt-strategy';
config();
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
