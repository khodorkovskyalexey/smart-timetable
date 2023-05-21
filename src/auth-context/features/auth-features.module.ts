import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/infrastructure/config/jwt-config.service';
import { GetMeFeature } from './get-me/get-me.feature';
import { SignInFeature } from './sign-in/sign-in.feature';

const features = [SignInFeature, GetMeFeature];

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService })],
  providers: features,
  exports: features,
})
export class AuthFeaturesModule {}
