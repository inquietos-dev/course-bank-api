import { logSchema } from './schemas/log.schema';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
export const mongoProviders = [
  {
    provide: 'MONGO_CONNECTION',
    useFactory: (config: ConfigService) => {
      return mongoose.connect(config.get('database.mongo.url'));
    },
    inject: [ConfigService],
  },
  {
    provide: 'LOG_MODEL',
    useFactory: (connection: mongoose.Connection) => {
      return mongoose.model('Log', logSchema);
    },
    inject: ['MONGO_CONNECTION'],
  },
];
