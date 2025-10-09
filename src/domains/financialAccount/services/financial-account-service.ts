import { FinancialAccountRepository } from '../repositories/financial-account-repository';
import { FinancialAccount } from '../types';

export class FinancialAccountService {
  private repository: FinancialAccountRepository;

  constructor() {
    this.repository = new FinancialAccountRepository();
  }

  async createAccount(account: Omit<FinancialAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<FinancialAccount> {
    return this.repository.create(account);
  }

  async getAccountById(id: string): Promise<FinancialAccount | null> {
    return this.repository.findById(id);
  }

  async getAllAccounts(): Promise<FinancialAccount[]> {
    return this.repository.findAll();
  }

  async getAccountsByOrganization(organizationId: string): Promise<FinancialAccount[]> {
    return this.repository.findByOrganizationId(organizationId);
  }

  async updateAccount(id: string, updates: Partial<FinancialAccount>): Promise<FinancialAccount> {
    return this.repository.update(id, updates);
  }

  async deleteAccount(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async initializeWithMockData(mockData: FinancialAccount[]): Promise<void> {
    const existingAccounts = await this.repository.findAll();
    if (existingAccounts.length === 0) {
      for (const account of mockData) {
        const { id, createdAt, updatedAt, ...accountData } = account;
        await this.repository.create(accountData);
      }
      console.log('Mock financial accounts initialized');
    }
  }
}
