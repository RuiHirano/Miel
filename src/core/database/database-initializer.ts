import { DatabaseProviderFactory } from './database-provider';
import { FeedbackService } from '../../domains/feedback/services/feedback-service';
import { TransactionService } from '../../domains/transaction/services/transaction-service';
import { mockAIFeedbacks } from '../../domains/feedback/mock';
import { FinancialAccountService } from '../../domains/financialAccount/services/financial-account-service';
import { mockFinancialAccounts } from '../../domains/financialAccount/mock';

export class DatabaseInitializer {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      const provider = await DatabaseProviderFactory.getProvider('indexeddb');
      await provider.initialize();

      await this.initializeWithMockData();

      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private static async initializeWithMockData(): Promise<void> {
    const feedbackService = new FeedbackService();
    const financialAccountService = new FinancialAccountService();
    
    await Promise.all([
      feedbackService.initializeWithMockData(mockAIFeedbacks),
      financialAccountService.initializeWithMockData(mockFinancialAccounts)
    ]);
    
    console.log('Mock data initialized');
  }

  static async createDefaultCategories(): Promise<void> {
    const transactionService = new TransactionService();
    
    const defaultCategories = [
      { name: '食費', icon: '🍽️', color: '#FF6B6B' },
      { name: '交通費', icon: '🚊', color: '#4ECDC4' },
      { name: '住居費', icon: '🏠', color: '#45B7D1' },
      { name: '光熱費', icon: '💡', color: '#FFA726' },
      { name: '給与', icon: '💰', color: '#66BB6A' },
      { name: '副収入', icon: '📈', color: '#AB47BC' },
      { name: '娯楽費', icon: '🎮', color: '#EF5350' },
      { name: '医療費', icon: '⚕️', color: '#26A69A' },
      { name: '教育費', icon: '📚', color: '#5C6BC0' },
      { name: 'その他', icon: '📋', color: '#78909C' }
    ];

    const existingCategories = await transactionService.getAllCategories();
    if (existingCategories.length === 0) {
      for (const category of defaultCategories) {
        await transactionService.createCategory(category);
      }
      console.log('Default transaction categories created');
    }
  }

  static async reset(): Promise<void> {
    try {
      await DatabaseProviderFactory.closeProvider();
      
      if ('indexedDB' in window) {
        const deleteRequest = indexedDB.deleteDatabase('MielDB');
        
        return new Promise((resolve, reject) => {
          deleteRequest.onsuccess = () => {
            this.isInitialized = false;
            console.log('Database reset successfully');
            resolve();
          };
          
          deleteRequest.onerror = () => {
            reject(new Error('Failed to reset database'));
          };
        });
      }
    } catch (error) {
      console.error('Failed to reset database:', error);
      throw error;
    }
  }

  static isReady(): boolean {
    return this.isInitialized;
  }
}