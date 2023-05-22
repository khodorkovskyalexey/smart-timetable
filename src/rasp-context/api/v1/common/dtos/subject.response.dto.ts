export interface SubjectResponseDtoParams {
  id?: number;
  name: string;
}

export class SubjectResponseDto {
  constructor(params: SubjectResponseDtoParams) {
    const assignObject: SubjectResponseDto = {
      id: params.id,
      name: params.name,
    };

    Object.assign(this, assignObject);
  }

  id?: number;

  name: string;
}
