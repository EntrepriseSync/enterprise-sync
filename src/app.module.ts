import * as Joi from '@hapi/joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabseModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    DatabseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
