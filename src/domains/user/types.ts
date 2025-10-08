import { DatabaseEntity } from '../../core/database/interfaces';

export interface User extends DatabaseEntity {
  email: string;
}
