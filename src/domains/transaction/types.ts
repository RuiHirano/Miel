import { DatabaseEntity } from '../../core/database/interfaces';

export type TransactionType = "income" | "expense";

export interface Transaction extends DatabaseEntity {
  userId: string;
  organizationId: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
}

export interface TransactionCategory extends DatabaseEntity {
  name: string;
  icon?: string;
  color?: string;
}
