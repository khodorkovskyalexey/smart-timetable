import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAM, JwtAuthGuard } from 'src/auth-context/shared/auth-guard';
import { CreateCustomEventFeature } from 'src/rasp-context/features/create-custom-event/create-custom-event.feature';
import { LessonResponseDto } from '../../common/dtos/lesson.response.dto';
import { CreateCustomEventRequestDto } from './create-custom-event.request.dto';

@ApiTags('lessons')
@Controller('lessons')
export class CreateCustomEventController {
  constructor(private readonly createCustomEventFeature: CreateCustomEventFeature) {}

  @ApiOperation({ summary: 'Create custom event' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@IAM('id') userId: string, @Body() body: CreateCustomEventRequestDto): Promise<LessonResponseDto> {
    const customEvent = await this.createCustomEventFeature.handle({
      userId,
      name: body.name,
      auditoriumName: body.auditoriumName,
      startAt: body.startAt,
      endAt: body.endAt,
      group: {
        name: body.group.name,
        groupId: body.group.groupId,
        subGroupId: body.group.subGroupId,
        groupListId: body.group.groupListId,
      },
    });

    return new LessonResponseDto(customEvent);
  }
}
