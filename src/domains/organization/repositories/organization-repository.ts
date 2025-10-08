import { IRepository } from '../../../core/database/interfaces';
import { DatabaseProviderFactory } from '../../../core/database/database-provider';
import { Organization } from '../types';

export class OrganizationRepository {
  private repository: IRepository<Organization>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider();
    this.repository = provider.getRepository<Organization>('organizations');
  }

  private async ensureRepository(): Promise<IRepository<Organization>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(organization: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Promise<Organization> {
    const repo = await this.ensureRepository();
    return repo.create(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<Organization[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByUserId(userId: string): Promise<Organization[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ userId });
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const repo = await this.ensureRepository();
    const orgs = await repo.findBy({ slug });
    return orgs.length > 0 ? orgs[0] : null;
  }

  async update(id: string, updates: Partial<Organization>): Promise<Organization> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}