export interface CommentResponseDtoParams {
  id: string;
  text: string;
}

export class CommentResponseDto {
  constructor(params: CommentResponseDtoParams) {
    const assignObject: CommentResponseDto = {
      id: params.id,
      text: params.text,
    };

    Object.assign(this, assignObject);
  }

  id: string;

  text: string;
}
