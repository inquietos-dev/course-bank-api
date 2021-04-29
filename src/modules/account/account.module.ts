import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { DatabaseModule } from '../database/database.module';
import { MovementsModule } from './modules/movements/movements.module';

@Module({
  imports: [
    DatabaseModule,
    MovementsModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('/account*');
  }
}
