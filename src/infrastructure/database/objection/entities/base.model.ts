import { Model } from 'objection';

export class ObjectionEntityBase extends Model {
  readonly id: string;

  createdAt: Date;

  updatedAt: Date;

  protected $hidden: string[] = [];
}
