import { UserResponseDto, UserResponseDtoParams } from './user.response.dto';

export interface TokenResponseDtoParams {
  token: string;
  user: UserResponseDtoParams;
}

export class TokenResponseDto {
  constructor(params: TokenResponseDtoParams) {
    const assignObject: TokenResponseDto = {
      token: params.token,
      user: new UserResponseDto(params.user),
    };

    Object.assign(this, assignObject);
  }

  token: string;

  user: UserResponseDto;
}
