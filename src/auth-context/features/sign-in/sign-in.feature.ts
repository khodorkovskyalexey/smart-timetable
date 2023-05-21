import { BadRequestException, Injectable } from '@nestjs/common';
import { Token } from 'src/auth-context/core/interfaces/token';
import { UserEntity } from 'src/infrastructure/database/objection/entities';
import { SignInFeatureDto } from './sign-in.feature.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'src/auth-context/core/types';

@Injectable()
export class SignInFeature {
  private jwtSecret: string;
  private jwtExpiresIn: number;

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.getOrThrow<string>('jwt.secret');
    this.jwtExpiresIn = this.configService.getOrThrow<number>('jwt.expiresIn');
  }

  async handle(dto: SignInFeatureDto): Promise<Token> {
    const { email, password } = dto;

    const user = await UserEntity.query().findOne({ email });

    const isPasswordValid = !!user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: TokenPayload = {
      id: user.id,
      expiration: this.getExpirationTime(),
    };

    const token = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: this.jwtExpiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        lecturerOmgtuRaspId: user.lecturerOmgtuRaspId,
      },
    };
  }

  private getExpirationTime(): Date {
    const expiration = new Date();

    expiration.setTime(this.jwtExpiresIn * 1000 + expiration.getTime());

    return expiration;
  }
}
