import { DatabaseEntity } from '../../core/database/interfaces';

export interface Organization extends DatabaseEntity {
  name: string;
  displayName: string;
  description?: string;
  slug: string;
  userId?: string;
}
