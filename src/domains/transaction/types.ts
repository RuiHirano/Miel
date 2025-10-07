export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  userId: string;
  organizationId: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionCategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}
