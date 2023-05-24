import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAM, JwtAuthGuard } from 'src/auth-context/shared/auth-guard';
import { UpdateCommentFeature } from 'src/rasp-context/features/update-comment/update-comment.feature';
import { CommentResponseDto } from '../../common/dtos/comment.response.dto';
import { UpdateCommentRequestDto } from './update-comment.request.dto';

@ApiTags('lessons')
@Controller('lessons')
export class UpdateCommentController {
  constructor(private readonly updateCommentFeature: UpdateCommentFeature) {}

  @ApiOperation({ summary: 'Update comment' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('comments')
  async handle(@IAM('id') userId: string, @Body() body: UpdateCommentRequestDto): Promise<CommentResponseDto> {
    const comment = await this.updateCommentFeature.handle({
      userId,
      lessonType: body.lessonType,
      lessonId: body.lessonId,
      text: body.text,
    });

    return new CommentResponseDto(comment);
  }
}
