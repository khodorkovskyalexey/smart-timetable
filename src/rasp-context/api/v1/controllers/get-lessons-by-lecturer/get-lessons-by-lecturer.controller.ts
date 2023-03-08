import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetLessonsByLecturerFeature } from 'src/rasp-context/features/get-lessons-by-lecturer/get-lessons-by-lecturer.feature';
import { LessonResponseDto } from '../../common/dtos/lesson.response.dto';
import { GetLessonsByLecturerQueryDto } from './get-lessons-by-lecturer.query.dto';

@ApiTags('lessons')
@Controller('lessons')
export class GetLessonsByLecturerController {
  constructor(private readonly getLessonsByLecturerFeature: GetLessonsByLecturerFeature) {}

  @ApiOperation({ summary: 'Get lessons by lecturer id' })
  @Get('lecturers/:lecturerId')
  async handle(
    @Param('lecturerId', ParseIntPipe) lecturerId: number,
    @Query() query: GetLessonsByLecturerQueryDto,
  ): Promise<LessonResponseDto[]> {
    const lessons = await this.getLessonsByLecturerFeature.handle({
      lecturerId,
      startAt: new Date(query.startAt),
      endAt: new Date(query.endAt),
    });

    return lessons.map((lesson) => new LessonResponseDto(lesson));
  }
}
