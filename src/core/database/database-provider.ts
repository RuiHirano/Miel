import { IDatabaseProvider } from './interfaces';
import { IndexedDBProvider } from './indexeddb/indexeddb-provider';

export type DatabaseType = 'indexeddb' | 'dynamodb';

export class DatabaseProviderFactory {
  private static instance: IDatabaseProvider | null = null;

  static async getProvider(type: DatabaseType = 'indexeddb'): Promise<IDatabaseProvider> {
    if (!this.instance) {
      switch (type) {
        case 'indexeddb':
          this.instance = new IndexedDBProvider();
          break;
        case 'dynamodb':
          throw new Error('DynamoDB provider not implemented yet');
        default:
          throw new Error(`Unknown database type: ${type}`);
      }
      await this.instance.initialize();
    }
    return this.instance;
  }

  static async closeProvider(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}