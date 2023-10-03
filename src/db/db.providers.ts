import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        ssl: {
          rejectUnauthorized: false,
          cert: readFileSync(configService.get('POSTGRES_CERT')).toString(),
        },
        synchronize: true,
        logging: ['error'],
      });

      return dataSource.initialize();
    },
  },
];
