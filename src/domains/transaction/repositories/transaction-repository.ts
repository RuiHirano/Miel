import { IRepository } from '../../../core/database/interfaces';
import { DatabaseProviderFactory } from '../../../core/database/database-provider';
import { Transaction, TransactionCategory } from '../types';

export class TransactionRepository {
  private repository: IRepository<Transaction>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider('indexeddb');
    this.repository = provider.getRepository<Transaction>('transactions');
  }

  private async ensureRepository(): Promise<IRepository<Transaction>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const repo = await this.ensureRepository();
    return repo.create(transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<Transaction[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ userId });
  }

  async findByOrganizationId(organizationId: string): Promise<Transaction[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ organizationId });
  }

  async findByType(type: Transaction['type']): Promise<Transaction[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ type });
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ categoryId });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const allTransactions = await this.findAll();
    return allTransactions.filter(transaction => 
      transaction.date >= startDate && transaction.date <= endDate
    );
  }

  async update(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}

export class TransactionCategoryRepository {
  private repository: IRepository<TransactionCategory>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider('indexeddb');
    this.repository = provider.getRepository<TransactionCategory>('transaction_categories');
  }

  private async ensureRepository(): Promise<IRepository<TransactionCategory>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(category: Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<TransactionCategory> {
    const repo = await this.ensureRepository();
    return repo.create(category);
  }

  async findById(id: string): Promise<TransactionCategory | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<TransactionCategory[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByName(name: string): Promise<TransactionCategory | null> {
    const repo = await this.ensureRepository();
    const categories = await repo.findBy({ name });
    return categories.length > 0 ? categories[0] : null;
  }

  async update(id: string, updates: Partial<TransactionCategory>): Promise<TransactionCategory> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}