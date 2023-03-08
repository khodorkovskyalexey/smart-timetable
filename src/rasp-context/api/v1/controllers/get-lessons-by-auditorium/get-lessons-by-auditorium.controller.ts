import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetLessonsByAuditoriumFeature } from 'src/rasp-context/features/get-lessons-by-auditorium/get-lessons-by-auditorium.feature';
import { LessonResponseDto } from '../../common/dtos/lesson.response.dto';
import { GetLessonsByAuditoriumQueryDto } from './get-lessons-by-auditorium.query.dto';

@ApiTags('lessons')
@Controller('lessons')
export class GetLessonsByAuditoriumController {
  constructor(private readonly getLessonsByAuditoriumFeature: GetLessonsByAuditoriumFeature) {}

  @ApiOperation({ summary: 'Get lessons by auditorium id' })
  @Get('auditories/:auditoriumId')
  async handle(
    @Param('auditoriumId', ParseIntPipe) auditoriumId: number,
    @Query() query: GetLessonsByAuditoriumQueryDto,
  ): Promise<LessonResponseDto[]> {
    const lessons = await this.getLessonsByAuditoriumFeature.handle({
      auditoriumId,
      startAt: new Date(query.startAt),
      endAt: new Date(query.endAt),
    });

    return lessons.map((lesson) => new LessonResponseDto(lesson));
  }
}
