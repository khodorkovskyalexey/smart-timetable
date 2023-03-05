import { ApiProperty } from '@nestjs/swagger';
import { RaspTargetFilterType } from 'src/rasp-context/core/interfaces/rasp-target-filter';

export interface RaspTargetFilterResponseDtoParams {
  id: number;
  type: RaspTargetFilterType;
  title: string;
  description: string;
}

export class RaspTargetFilterResponseDto {
  constructor(params: RaspTargetFilterResponseDtoParams) {
    const assignObject: RaspTargetFilterResponseDto = {
      id: params.id,
      type: params.type,
      title: params.title,
      description: params.description,
    };

    Object.assign(this, assignObject);
  }

  id: number;

  @ApiProperty({
    enum: RaspTargetFilterType,
    enumName: 'RaspTargetFilterTypeEnum',
    nullable: false,
  })
  type: RaspTargetFilterType;

  title: string;

  description: string;
}
