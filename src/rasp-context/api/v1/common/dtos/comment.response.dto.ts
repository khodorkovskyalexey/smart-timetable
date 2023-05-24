export interface CommentResponseDtoParams {
  text: string;
}

export class CommentResponseDto {
  constructor(params: CommentResponseDtoParams) {
    const assignObject: CommentResponseDto = {
      text: params.text,
    };

    Object.assign(this, assignObject);
  }

  text: string;
}
