import { AccountEntity } from './entities/account.entity';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import * as ormconfig from '../../ormconfig';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) => {
      // @ts-ignore
      return await createConnection({
        ...ormconfig,
        host: config.get('database.postgres.host'),
      });
    },
    inject: [ConfigService],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AccountEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
