import { Model } from 'objection';
import { BaseEntityInterface } from '../../interfaces';

export class ObjectionEntityBase extends Model implements BaseEntityInterface {
  readonly id: string;

  createdAt: Date;

  updatedAt: Date;

  protected $hidden: string[] = [];
}
