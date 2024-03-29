import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TeamModule } from './modules/team/team.module';
import { FixtureModule } from './modules/fixture/fixture.module';
import { AuthModule as AdminAuthModule } from './modules/admin/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from './config/multer.config';
import { FixtureSchema } from './schema/fixture.schema';
import { TeamSchema } from './schema/team.schema';
import { LinkSchema } from './schema/link.schema';
import { FixtureService } from './modules/fixture/fixture.service';
import { TeamService } from './modules/team/team.service';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiter } from './config/rate.limiter';

@Module({
  imports: [
    AuthModule,
    TeamModule,
    FixtureModule,
    AdminAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.mongodbUri),
    MulterModule.register(MulterConfig),
    MongooseModule.forFeature([
      { name: 'Fixture', schema: FixtureSchema },
      { name: 'Team', schema: TeamSchema },
      { name: 'Link', schema: LinkSchema },
    ]),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,

      //@ts-ignore
      store: async () =>
        await redisStore({
          password: process.env.REDIS_PASSWORD,
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
        }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiter,
    },
    AppService,
    FixtureService,
    TeamService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
