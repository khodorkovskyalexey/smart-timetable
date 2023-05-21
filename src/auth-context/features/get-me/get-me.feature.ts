import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/database/objection/entities';
import { User } from 'src/auth-context/core/interfaces/user';
import { GetMeFeatureDto } from './get-me.feature.dto';

@Injectable()
export class GetMeFeature {
  async handle(dto: GetMeFeatureDto): Promise<User> {
    const { id } = dto;

    const user = await UserEntity.query().findById(id).throwIfNotFound(new NotFoundException('User not found'));

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      lecturerOmgtuRaspId: user.lecturerOmgtuRaspId,
    };
  }
}
