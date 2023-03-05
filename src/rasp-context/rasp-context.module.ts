import { Module } from '@nestjs/common';
import { RaspApiModule } from './api/rasp-api.module';
import { RaspFeaturesModule } from './features/rasp-features.module';

@Module({
  imports: [RaspFeaturesModule, RaspApiModule],
})
export class RaspContextModule {}
