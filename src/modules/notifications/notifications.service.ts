import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor() {}

  public sendEmail(email: string): void {
    console.log(email);
  }
}
