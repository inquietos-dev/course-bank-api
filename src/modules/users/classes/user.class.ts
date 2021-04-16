import { Exclude, Expose } from 'class-transformer';

export class User {
  id: number;
  name: string;
  surname: string;
  role: string;
  createdAt: Date;
  @Exclude()
  password: string;
  email: string;
  age: number;
  city: string;

  @Expose()
  get fullname() {
    return `${this.name} ${this.surname}`;
  }

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
