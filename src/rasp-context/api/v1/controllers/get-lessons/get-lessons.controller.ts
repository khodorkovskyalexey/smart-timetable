import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLessonsFeature } from 'src/rasp-context/features/get-lessons/get-lessons.feature';
import { LessonResponseDto } from '../../common/dtos/lesson.response.dto';
import { GetLessonsQueryDto } from './dtos/get-lessons.query.dto';

@ApiTags('lessons')
@Controller('lessons')
export class GetLessonsController {
  constructor(private readonly getLessonsFeature: GetLessonsFeature) {}

  @Get('groups/:groupId')
  async handle(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() query: GetLessonsQueryDto,
  ): Promise<LessonResponseDto[]> {
    const lessons = await this.getLessonsFeature.handle({
      groupId,
      startAt: new Date(query.startAt),
      endAt: new Date(query.endAt),
    });

    return lessons.map((lesson) => new LessonResponseDto(lesson));
  }
}
