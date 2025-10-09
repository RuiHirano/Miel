import { IRepository } from '../../../core/database/interfaces';
import { DatabaseProviderFactory } from '../../../core/database/database-provider';
import { FinancialAccount } from '../types';

export class FinancialAccountRepository {
  private repository: IRepository<FinancialAccount>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider();
    this.repository = provider.getRepository<FinancialAccount>('financial_accounts');
  }

  private async ensureRepository(): Promise<IRepository<FinancialAccount>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(account: Omit<FinancialAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<FinancialAccount> {
    const repo = await this.ensureRepository();
    return repo.create(account);
  }

  async findById(id: string): Promise<FinancialAccount | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<FinancialAccount[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByOrganizationId(organizationId: string): Promise<FinancialAccount[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ organizationId });
  }

  async update(id: string, updates: Partial<FinancialAccount>): Promise<FinancialAccount> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}
