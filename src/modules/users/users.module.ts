import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from '../../common/middlewares/logger.middleware';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'user', method: RequestMethod.POST },
      );
  }
}
