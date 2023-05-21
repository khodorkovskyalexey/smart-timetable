import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMeFeature } from 'src/auth-context/features/get-me/get-me.feature';
import { IAM, JwtAuthGuard } from 'src/auth-context/shared/auth-guard';
import { UserResponseDto } from '../../common/dtos/user.response.dto';

@ApiTags('auth')
@Controller('auth')
export class GetMeController {
  constructor(private readonly getMeFeature: GetMeFeature) {}

  @ApiOperation({ summary: 'Get me' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async handle(@IAM('id') userId: string): Promise<UserResponseDto> {
    const user = await this.getMeFeature.handle({
      id: userId,
    });

    return new UserResponseDto(user);
  }
}
