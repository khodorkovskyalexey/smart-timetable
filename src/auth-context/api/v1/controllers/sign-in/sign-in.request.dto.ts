import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, Validate } from 'class-validator';
import { MOCK_PASSWORD, MOCK_STABLE_USER_EMAIL } from 'database/helpers/mock-constants';
import { IsEmailValidator } from 'src/libs/validators/is-email.validator';

export class SignInRequestDto {
  @ApiProperty({ example: MOCK_STABLE_USER_EMAIL })
  @IsDefined()
  @Validate(IsEmailValidator)
  readonly email: string;

  @ApiProperty({ example: MOCK_PASSWORD })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
