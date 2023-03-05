export interface LecturerResponseDtoParams {
  id: number;
  name: string;
}

export class LecturerResponseDto {
  constructor(params: LecturerResponseDtoParams) {
    const assignObject: LecturerResponseDto = {
      id: params.id,
      name: params.name,
    };

    Object.assign(this, assignObject);
  }

  id: number;

  name: string;
}
