import { FeedbackRepository } from '../repositories/feedback-repository';
import { AIFeedback } from '../mock';

export class FeedbackService {
  private repository: FeedbackRepository;

  constructor() {
    this.repository = new FeedbackRepository();
  }

  async createFeedback(feedback: Omit<AIFeedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIFeedback> {
    return this.repository.create(feedback);
  }

  async getFeedbackById(id: string): Promise<AIFeedback | null> {
    return this.repository.findById(id);
  }

  async getAllFeedbacks(): Promise<AIFeedback[]> {
    return this.repository.findAll();
  }

  async getFeedbacksByPriority(priority: AIFeedback['priority']): Promise<AIFeedback[]> {
    return this.repository.findByPriority(priority);
  }

  async getFeedbacksByType(type: AIFeedback['type']): Promise<AIFeedback[]> {
    return this.repository.findByType(type);
  }

  async getFeedbacksByCategory(category: AIFeedback['category']): Promise<AIFeedback[]> {
    return this.repository.findByCategory(category);
  }

  async getActionableFeedbacks(): Promise<AIFeedback[]> {
    return this.repository.findActionable();
  }

  async getHighPriorityFeedbacks(): Promise<AIFeedback[]> {
    return this.repository.findByPriority('high');
  }

  async getDashboardFeedbacks(): Promise<{
    highPriority: AIFeedback[];
    actionable: AIFeedback[];
    recent: AIFeedback[];
  }> {
    const [highPriority, actionable, allFeedbacks] = await Promise.all([
      this.getHighPriorityFeedbacks(),
      this.getActionableFeedbacks(),
      this.getAllFeedbacks()
    ]);

    const recent = allFeedbacks
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    return {
      highPriority,
      actionable,
      recent
    };
  }

  async updateFeedback(id: string, updates: Partial<AIFeedback>): Promise<AIFeedback> {
    return this.repository.update(id, updates);
  }

  async markFeedbackAsRead(id: string): Promise<AIFeedback> {
    return this.updateFeedback(id, { actionable: false });
  }

  async deleteFeedback(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async initializeWithMockData(mockFeedbacks: AIFeedback[]): Promise<void> {
    const existing = await this.getAllFeedbacks();
    if (existing.length === 0) {
      for (const feedback of mockFeedbacks) {
        const { id, createdAt, updatedAt, ...feedbackData } = feedback;
        await this.repository.create(feedbackData);
      }
    }
  }
}