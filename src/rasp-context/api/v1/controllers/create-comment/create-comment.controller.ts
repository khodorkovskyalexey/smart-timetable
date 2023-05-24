import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAM, JwtAuthGuard } from 'src/auth-context/shared/auth-guard';
import { CreateCommentFeature } from 'src/rasp-context/features/create-comment/create-comment.feature';
import { CommentResponseDto } from '../../common/dtos/comment.response.dto';
import { CreateCommentRequestDto } from './create-comment.request.dto';

@ApiTags('lessons')
@Controller('lessons')
export class CreateCommentController {
  constructor(private readonly createCommentFeature: CreateCommentFeature) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('comments')
  async handle(@IAM('id') userId: string, @Body() body: CreateCommentRequestDto): Promise<CommentResponseDto> {
    const comment = await this.createCommentFeature.handle({
      userId,
      lessonType: body.lessonType,
      lessonId: body.lessonId,
      text: body.text,
    });

    return new CommentResponseDto(comment);
  }
}
