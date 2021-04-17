import { HttpModule, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationSendListener } from './listeners/notification-send.listener';

@Module({
  imports: [HttpModule],
  providers: [NotificationsService, NotificationSendListener],
  exports: [NotificationsService],
})
export class NotificationsModule {}
