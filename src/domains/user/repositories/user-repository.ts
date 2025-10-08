import { IRepository } from '../../../core/database/interfaces';
import { DatabaseProviderFactory } from '../../../core/database/database-provider';
import { User } from '../types';

export class UserRepository {
  private repository: IRepository<User>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider('indexeddb');
    this.repository = provider.getRepository<User>('users');
  }

  private async ensureRepository(): Promise<IRepository<User>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const repo = await this.ensureRepository();
    return repo.create(user);
  }

  async findById(id: string): Promise<User | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<User[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    const repo = await this.ensureRepository();
    const users = await repo.findBy({ email });
    return users.length > 0 ? users[0] : null;
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}