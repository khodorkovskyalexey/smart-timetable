import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInFeature } from 'src/auth-context/features/sign-in/sign-in.feature';
import { TokenResponseDto } from '../../common/dtos/token.response.dto';
import { SignInRequestDto } from './sign-in.request.dto';

@ApiTags('auth')
@Controller('auth')
export class SignInController {
  constructor(private readonly signInFeature: SignInFeature) {}

  @ApiOperation({ summary: 'Sign in' })
  @Post('sign-in')
  async handle(@Body() body: SignInRequestDto): Promise<TokenResponseDto> {
    const token = await this.signInFeature.handle({
      email: body.email,
      password: body.password,
    });

    return new TokenResponseDto({
      token: token.token,
      user: token.user,
    });
  }
}
