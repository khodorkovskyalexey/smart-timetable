import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.getOrThrow<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.getOrThrow<number>('jwt.expiresIn'),
      },
    };
  }
}
