import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetLessonsByGroupFeature } from 'src/rasp-context/features/get-lessons-by-group/get-lessons-by-group.feature';
import { LessonResponseDto } from '../../common/dtos/lesson.response.dto';
import { GetLessonsByGroupQueryDto } from './get-lessons-by-group.query.dto';

@ApiTags('lessons')
@Controller('lessons')
export class GetLessonsByGroupController {
  constructor(private readonly getLessonsByGroupFeature: GetLessonsByGroupFeature) {}

  @ApiOperation({ summary: 'Get lessons by group id' })
  @Get('groups/:groupId')
  async handle(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() query: GetLessonsByGroupQueryDto,
  ): Promise<LessonResponseDto[]> {
    const lessons = await this.getLessonsByGroupFeature.handle({
      groupId,
      startAt: new Date(query.startAt),
      endAt: new Date(query.endAt),
    });

    return lessons.map((lesson) => new LessonResponseDto(lesson));
  }
}
