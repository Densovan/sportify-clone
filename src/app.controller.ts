import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt.guard';
import { JwtArtistGuard } from './auth/jwt-artist.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  // @UseGuards(JwtGuard)
  @UseGuards(JwtArtistGuard)
  getProfile(@Request() req) {
    console.log('woork', req.user);
    return req.user;
  }
  // @Get('profile')
  // @UseGuards(JwtGuard)
  // getProfile(
  //   @Request()
  //   req,
  // ) {
  //   console.log('woork');
  //   return req.user;
  // }
}
