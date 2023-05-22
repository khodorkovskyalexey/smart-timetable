export interface AuditoriumResponseDtoParams {
  id?: number;
  name: string;
}

export class AuditoriumResponseDto {
  constructor(params: AuditoriumResponseDtoParams) {
    const assignObject: AuditoriumResponseDto = {
      id: params.id,
      name: params.name,
    };

    Object.assign(this, assignObject);
  }

  id?: number;

  name: string;
}
