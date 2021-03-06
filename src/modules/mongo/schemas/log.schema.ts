import * as mongoose from 'mongoose';

export const logSchema = new mongoose.Schema({
  action: String,
  account: Number,
  amount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
