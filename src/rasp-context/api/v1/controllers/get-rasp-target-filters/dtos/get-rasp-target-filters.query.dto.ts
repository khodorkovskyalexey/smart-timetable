import { IsDefined, IsString } from 'class-validator';

export class GetRaspTargetFiltersQueryDto {
  @IsDefined()
  @IsString()
  readonly searchFilter: string;
}
