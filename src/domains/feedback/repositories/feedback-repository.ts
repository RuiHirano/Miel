import { IRepository } from '../../../core/database/interfaces';
import { DatabaseProviderFactory } from '../../../core/database/database-provider';
import { AIFeedback } from '../mock';

export class FeedbackRepository {
  private repository: IRepository<AIFeedback>;

  constructor() {
    this.repository = null as any;
    this.initializeRepository();
  }

  private async initializeRepository(): Promise<void> {
    const provider = await DatabaseProviderFactory.getProvider();
    this.repository = provider.getRepository<AIFeedback>('feedbacks');
  }

  private async ensureRepository(): Promise<IRepository<AIFeedback>> {
    if (!this.repository) {
      await this.initializeRepository();
    }
    return this.repository;
  }

  async create(feedback: Omit<AIFeedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIFeedback> {
    const repo = await this.ensureRepository();
    return repo.create(feedback);
  }

  async findById(id: string): Promise<AIFeedback | null> {
    const repo = await this.ensureRepository();
    return repo.findById(id);
  }

  async findAll(): Promise<AIFeedback[]> {
    const repo = await this.ensureRepository();
    return repo.findAll();
  }

  async findByType(type: AIFeedback['type']): Promise<AIFeedback[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ type });
  }

  async findByPriority(priority: AIFeedback['priority']): Promise<AIFeedback[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ priority });
  }

  async findByCategory(category: AIFeedback['category']): Promise<AIFeedback[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ category });
  }

  async findActionable(): Promise<AIFeedback[]> {
    const repo = await this.ensureRepository();
    return repo.findBy({ actionable: true });
  }

  async update(id: string, updates: Partial<AIFeedback>): Promise<AIFeedback> {
    const repo = await this.ensureRepository();
    return repo.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const repo = await this.ensureRepository();
    return repo.delete(id);
  }
}