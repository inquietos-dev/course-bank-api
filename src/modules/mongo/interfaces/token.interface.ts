import { Document } from 'mongoose';
export interface Token extends Document {
  token: string;

  expiresAt: Date;
}
