import { Module } from '@nestjs/common';
import { AuthApiModule } from './api/auth-api.module';
import { AuthFeaturesModule } from './features/auth-features.module';

@Module({
  imports: [AuthFeaturesModule, AuthApiModule],
})
export class AuthContextModule {}
