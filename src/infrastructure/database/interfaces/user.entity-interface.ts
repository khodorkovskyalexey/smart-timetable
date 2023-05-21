import { BaseEntityInterface } from './base.entity-interface';

export interface UserEntityInterface extends BaseEntityInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  lecturerOmgtuRaspId: number;
}
