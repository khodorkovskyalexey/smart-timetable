import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsOptional, IsPositive, IsString } from 'class-validator';

class CreateCustomEventGroupRequestDto {
  @IsOptional()
  @IsPositive()
  readonly groupId?: number;

  @IsOptional()
  @IsPositive()
  readonly groupListId?: number;

  @IsOptional()
  @IsPositive()
  readonly subGroupId?: number;

  @IsDefined()
  @IsString()
  readonly name: string;
}

export class CreateCustomEventRequestDto {
  @IsDefined()
  @IsString()
  readonly name: string;

  @IsDefined()
  @Type(() => CreateCustomEventGroupRequestDto)
  readonly group: CreateCustomEventGroupRequestDto;

  @IsDefined()
  @IsString()
  readonly auditoriumName: string;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  readonly startAt: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  readonly endAt: Date;
}
