import { IsDefined, IsEnum, IsString } from 'class-validator';
import { LessonType } from 'src/rasp-context/core/types';

export class UpdateCommentRequestDto {
  @IsDefined()
  @IsString()
  readonly text: string;

  @IsDefined()
  @IsEnum(LessonType)
  readonly lessonType: LessonType;

  @IsDefined()
  @IsString()
  readonly lessonId: string;
}
