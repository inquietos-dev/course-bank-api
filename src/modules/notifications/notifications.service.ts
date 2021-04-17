import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private httpService: HttpService) {}

  public async sendEmail(email: string): Promise<void> {
    console.log(`Email to ${email}`);
    const { data } = await this.httpService
      .get('http://localhost:3001/')
      .toPromise();
    console.log(data);
  }
}
