import { TransactionRepository, TransactionCategoryRepository } from '../repositories/transaction-repository';
import { Transaction, TransactionCategory, TransactionType } from '../types';

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export class TransactionService {
  private repository: TransactionRepository;
  private categoryRepository: TransactionCategoryRepository;

  constructor() {
    this.repository = new TransactionRepository();
    this.categoryRepository = new TransactionCategoryRepository();
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const category = await this.categoryRepository.findById(transaction.categoryId);
    if (!category) {
      throw new Error(`Transaction category with id '${transaction.categoryId}' not found`);
    }
    return this.repository.create(transaction);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return this.repository.findById(id);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.repository.findAll();
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.repository.findByUserId(userId);
  }

  async getTransactionsByOrganization(organizationId: string): Promise<Transaction[]> {
    return this.repository.findByOrganizationId(organizationId);
  }

  async getTransactionsByType(type: TransactionType): Promise<Transaction[]> {
    return this.repository.findByType(type);
  }

  async getTransactionsByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    return this.repository.findByDateRange(startDate, endDate);
  }

  async getTransactionsByMonth(year: number, month: number, organizationId?: string): Promise<Transaction[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const transactions = await this.repository.findByDateRange(startDate, endDate);
    
    if (organizationId) {
      return transactions.filter(t => t.organizationId === organizationId);
    }
    
    return transactions;
  }

  async getTransactionSummary(organizationId?: string, startDate?: Date, endDate?: Date): Promise<TransactionSummary> {
    let transactions: Transaction[];
    
    if (startDate && endDate) {
      transactions = await this.repository.findByDateRange(startDate, endDate);
    } else {
      transactions = await this.repository.findAll();
    }
    
    if (organizationId) {
      transactions = transactions.filter(t => t.organizationId === organizationId);
    }

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        acc.transactionCount++;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0, transactionCount: 0 }
    );

    summary.balance = summary.totalIncome - summary.totalExpense;
    return summary;
  }

  async getMonthlyTrends(organizationId?: string, monthsBack: number = 12): Promise<MonthlyTrend[]> {
    const trends: MonthlyTrend[] = [];
    const currentDate = new Date();

    for (let i = monthsBack - 1; i >= 0; i--) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const year = month.getFullYear();
      const monthNum = month.getMonth() + 1;
      
      const transactions = await this.getTransactionsByMonth(year, monthNum, organizationId);
      const summary = await this.calculateSummaryFromTransactions(transactions);
      
      trends.push({
        month: `${year}-${monthNum.toString().padStart(2, '0')}`,
        income: summary.totalIncome,
        expense: summary.totalExpense,
        balance: summary.balance
      });
    }

    return trends;
  }

  private async calculateSummaryFromTransactions(transactions: Transaction[]): Promise<TransactionSummary> {
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        acc.transactionCount++;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0, transactionCount: 0 }
    );

    summary.balance = summary.totalIncome - summary.totalExpense;
    return summary;
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    if (updates.categoryId) {
      const category = await this.categoryRepository.findById(updates.categoryId);
      if (!category) {
        throw new Error(`Transaction category with id '${updates.categoryId}' not found`);
      }
    }
    return this.repository.update(id, updates);
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async createCategory(category: Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<TransactionCategory> {
    const existingCategory = await this.categoryRepository.findByName(category.name);
    if (existingCategory) {
      throw new Error(`Transaction category with name '${category.name}' already exists`);
    }
    return this.categoryRepository.create(category);
  }

  async getAllCategories(): Promise<TransactionCategory[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<TransactionCategory | null> {
    return this.categoryRepository.findById(id);
  }

  async updateCategory(id: string, updates: Partial<TransactionCategory>): Promise<TransactionCategory> {
    if (updates.name) {
      const existingCategory = await this.categoryRepository.findByName(updates.name);
      if (existingCategory && existingCategory.id !== id) {
        throw new Error(`Transaction category with name '${updates.name}' already exists`);
      }
    }
    return this.categoryRepository.update(id, updates);
  }

  async deleteCategory(id: string): Promise<void> {
    const transactions = await this.repository.findByCategory(id);
    if (transactions.length > 0) {
      throw new Error(`Cannot delete category with existing transactions. Found ${transactions.length} transactions.`);
    }
    return this.categoryRepository.delete(id);
  }
}