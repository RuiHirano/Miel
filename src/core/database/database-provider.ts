import { IDatabaseProvider } from './interfaces';
import { IndexedDBProvider } from './indexeddb/indexeddb-provider';
import { MockProvider } from './mock/mock-provider';

export type DatabaseType = 'indexeddb' | 'dynamodb' | 'mock';

export class DatabaseProviderFactory {
  private static instance: IDatabaseProvider | null = null;
  private static currentType: DatabaseType | null = null;

  static async getProvider(type?: DatabaseType): Promise<IDatabaseProvider> {
    // If no type specified, use the current type or default to 'indexeddb'
    const targetType = type || this.currentType || 'indexeddb';
    
    if (!this.instance || this.currentType !== targetType) {
      if (this.instance) {
        await this.instance.close();
      }
      
      switch (targetType) {
        case 'indexeddb':
          this.instance = new IndexedDBProvider();
          break;
        case 'mock':
          this.instance = new MockProvider();
          break;
        case 'dynamodb':
          throw new Error('DynamoDB provider not implemented yet');
        default:
          throw new Error(`Unknown database type: ${targetType}`);
      }
      await this.instance.initialize();
      this.currentType = targetType;
    }
    return this.instance;
  }

  static async switchProvider(type: DatabaseType): Promise<IDatabaseProvider> {
    await this.closeProvider();
    return this.getProvider(type);
  }

  static async closeProvider(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
      this.currentType = null;
    }
  }
}