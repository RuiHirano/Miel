import { IDatabaseProvider, IRepository, DatabaseEntity } from '../interfaces';
import { MockRepository } from './mock-repository';
import { mockAIFeedbacks } from '../../../domains/feedback/mock';
import { mockOrganizations } from '../../../domains/organization/mock';
import { mockTransactions, mockTransactionCategories } from '../../../domains/transaction/mock';
import { mockUsers } from '../../../domains/user/mock';

export class MockProvider implements IDatabaseProvider {
  private repositories: Map<string, IRepository<any>> = new Map();
  private isInitialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    // Initialize repositories with mock data
    this.initializeRepository('users', mockUsers);
    this.initializeRepository('organizations', mockOrganizations);
    this.initializeRepository('transactions', mockTransactions);
    this.initializeRepository('transaction_categories', mockTransactionCategories);
    this.initializeRepository('feedbacks', mockAIFeedbacks);

    this.isInitialized = true;
    console.log('Mock database provider initialized');
  }

  async close(): Promise<void> {
    this.repositories.clear();
    this.isInitialized = false;
    console.log('Mock database provider closed');
  }

  getRepository<T extends DatabaseEntity>(tableName: string): IRepository<T> {
    if (!this.isInitialized) {
      throw new Error('Mock provider not initialized. Call initialize() first.');
    }

    if (!this.repositories.has(tableName)) {
      // Create empty repository if not exists
      const repository = new MockRepository<T>(tableName);
      this.repositories.set(tableName, repository);
    }

    return this.repositories.get(tableName)!;
  }

  private initializeRepository<T extends DatabaseEntity>(tableName: string, mockData: T[]): void {
    const repository = new MockRepository<T>(tableName, mockData);
    this.repositories.set(tableName, repository);
  }

  // Helper method to reset mock data
  async reset(): Promise<void> {
    await this.close();
    await this.initialize();
  }

  // Helper method to get current mock data
  getMockData(tableName: string): any[] {
    const repository = this.repositories.get(tableName) as MockRepository<any>;
    return repository ? repository.getAllData() : [];
  }
}