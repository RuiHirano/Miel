import { IDatabaseProvider, IRepository, DatabaseEntity } from '../interfaces';
import { IndexedDBClient, IndexedDBConfig } from './indexeddb-client';
import { BaseIndexedDBRepository } from './base-repository';

export class IndexedDBProvider implements IDatabaseProvider {
  private client: IndexedDBClient;
  private repositories: Map<string, IRepository<any>> = new Map();

  constructor() {
    const config: IndexedDBConfig = {
      databaseName: 'MielDB',
      version: 1,
      tables: [
        {
          name: 'users',
          keyPath: 'id',
          indexes: [
            { name: 'email', keyPath: 'email', options: { unique: true } }
          ]
        },
        {
          name: 'organizations',
          keyPath: 'id',
          indexes: [
            { name: 'userId', keyPath: 'userId' },
            { name: 'slug', keyPath: 'slug', options: { unique: true } }
          ]
        },
        {
          name: 'transactions',
          keyPath: 'id',
          indexes: [
            { name: 'userId', keyPath: 'userId' },
            { name: 'organizationId', keyPath: 'organizationId' },
            { name: 'categoryId', keyPath: 'categoryId' },
            { name: 'type', keyPath: 'type' },
            { name: 'date', keyPath: 'date' }
          ]
        },
        {
          name: 'transaction_categories',
          keyPath: 'id'
        },
        {
          name: 'feedbacks',
          keyPath: 'id',
          indexes: [
            { name: 'type', keyPath: 'type' },
            { name: 'priority', keyPath: 'priority' },
            { name: 'category', keyPath: 'category' },
            { name: 'actionable', keyPath: 'actionable' }
          ]
        }
      ]
    };

    this.client = new IndexedDBClient(config);
  }

  async initialize(): Promise<void> {
    await this.client.initialize();
  }

  async close(): Promise<void> {
    await this.client.close();
    this.repositories.clear();
  }

  getRepository<T extends DatabaseEntity>(tableName: string): IRepository<T> {
    if (!this.repositories.has(tableName)) {
      const repository = new BaseIndexedDBRepository<T>(this.client, tableName);
      this.repositories.set(tableName, repository);
    }
    return this.repositories.get(tableName)!;
  }
}