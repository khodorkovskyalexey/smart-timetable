import { UserEntityInterface } from '../../interfaces';
import { ObjectionEntityBase } from './base.entity';

export class UserEntity extends ObjectionEntityBase implements UserEntityInterface {
  static tableName = 'users';

  $hidden = ['password'];

  email: string;

  password: string;

  firstName: string;

  lastName: string;

  lecturerOmgtuRaspId: number;
}
