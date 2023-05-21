import { Module } from '@nestjs/common';
import { AuthFeaturesModule } from '../features/auth-features.module';
import { GetMeController } from './v1/controllers/get-me/get-me.controller';
import { SignInController } from './v1/controllers/sign-in/sign-in.controller';

@Module({
  imports: [AuthFeaturesModule],
  controllers: [SignInController, GetMeController],
})
export class AuthApiModule {}
