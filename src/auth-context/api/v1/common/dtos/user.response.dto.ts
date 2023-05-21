export interface UserResponseDtoParams {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  lecturerOmgtuRaspId: number;
}

export class UserResponseDto {
  constructor(params: UserResponseDtoParams) {
    const assignObject: UserResponseDto = {
      id: params.id,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      lecturerOmgtuRaspId: params.lecturerOmgtuRaspId,
    };

    Object.assign(this, assignObject);
  }

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  lecturerOmgtuRaspId: number;
}
