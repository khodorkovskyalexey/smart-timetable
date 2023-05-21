import { Module } from '@nestjs/common';
import { AuthFeaturesModule } from '../features/auth-features.module';
import { SignInController } from './v1/controllers/sign-in/sign-in.controller';

@Module({
  imports: [AuthFeaturesModule],
  controllers: [SignInController],
})
export class AuthApiModule {}
