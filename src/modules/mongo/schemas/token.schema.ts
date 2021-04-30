import * as mongoose from 'mongoose';
export const logSchema = new mongoose.Schema({
  token: String,
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
