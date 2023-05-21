import { Module } from '@nestjs/common';
import { AuthApiModule } from './api/auth-api.module';
import { AuthFeaturesModule } from './features/auth-features.module';
import { AuthGuardModule } from './shared/auth-guard/auth-guard.module';

@Module({
  imports: [AuthFeaturesModule, AuthApiModule, AuthGuardModule],
})
export class AuthContextModule {}
