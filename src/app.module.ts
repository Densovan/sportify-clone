import { DevConfigService } from './providers/DevConfigService';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DataSource } from 'typeorm';
import { PlayListModule } from './playlists/playlists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database.module';
import { ArtistsModule } from './artists/artists.module';
const devConfig = {
  port: 9000,
};
const proConfig = {
  port: 4000,
};
config();
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'production' ? proConfig : devConfig;
      },
    },
    AppService,
    DevConfigService,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('AppModule', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'songs', method: RequestMethod.POST });
  }
}
