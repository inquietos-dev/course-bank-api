import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { DatabaseModule } from '../database/database.module';
import { MovementsModule } from './modules/movements/movements.module';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [DatabaseModule, MongoModule, MovementsModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('/account*');
  }
}
