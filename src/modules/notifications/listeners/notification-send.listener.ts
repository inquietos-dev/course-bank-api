import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class NotificationSendListener {

  constructor(
    private notificationService: NotificationsService,
  ) {}

  @OnEvent('notification.send')
  handleNotificationSend(event: { email: string }): void {
    console.log(`Event received ${ JSON.stringify(event) }`);
    this.notificationService.sendEmail(event.email);
  }

}
