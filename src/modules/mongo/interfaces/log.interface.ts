import { Document } from 'mongoose';
export interface Log extends Document {
  readonly action: string;
  readonly account: number;
  readonly amount: number;
  readonly timestamp: Date;
}
