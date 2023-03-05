import { OmgtuRaspId } from '../types';

export enum RaspTargetFilterType {
  GROUP = 'GROUP',
  AUDITORIUM = 'AUDITORIUM',
  LECTURER = 'LECTURER',
}

export interface RaspTargetFilter {
  id: OmgtuRaspId;
  type: RaspTargetFilterType;
  title: string;
  description: string;
}
