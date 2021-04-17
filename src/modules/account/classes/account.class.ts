import { Exclude, Expose } from 'class-transformer';

export class Account {
  id: number;

  alias: string;

  amount: number;

  @Exclude()
  status: string;

  @Expose()
  get iban() {
    return `ES-${this.id}`;
  }

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
