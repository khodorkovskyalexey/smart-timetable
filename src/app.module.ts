import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as config from 'src/infrastructure/config/configuration';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config.configuration],
      validationSchema: config.validationSchema,
      validationOptions: config.validationOptions,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
