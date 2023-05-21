import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/auth-context/core/types';
import { UserEntity } from 'src/infrastructure/database/objection/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
    });
  }

  async validate(payload: TokenPayload): Promise<any> {
    const { id } = payload;

    const user = await UserEntity.query().findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
