import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInFeature } from './sign-in/sign-in.feature';

@Module({
  imports: [JwtModule],
  providers: [SignInFeature],
  exports: [SignInFeature],
})
export class AuthFeaturesModule {}
