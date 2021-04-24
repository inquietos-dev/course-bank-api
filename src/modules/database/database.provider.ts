import { AccountEntity } from './entities/account.entity';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) => {
      return await createConnection({
        type: 'postgres',
        host: config.get('database.postgres.host'),
        port: config.get('database.postgres.port'),
        username: config.get('database.postgres.user'),
        password: config.get('database.postgres.password'),
        database: config.get('database.postgres.database'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: ['query', 'error'],
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
