import { IsDefined, IsISO8601 } from 'class-validator';

export class GetLessonsByLecturerQueryDto {
  @IsDefined()
  @IsISO8601()
  readonly startAt: string;

  @IsDefined()
  @IsISO8601()
  readonly endAt: string;
}
