import { IRepository, DatabaseEntity } from '../interfaces';
import { IndexedDBClient } from './indexeddb-client';
import { v4 as uuidv4 } from 'uuid';

export class BaseIndexedDBRepository<T extends DatabaseEntity> implements IRepository<T> {
  protected client: IndexedDBClient;
  protected tableName: string;

  constructor(client: IndexedDBClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date();
    const newEntity: T = {
      ...entity,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    } as T;

    return this.client.executeTransaction(
      this.tableName,
      'readwrite',
      async (store) => {
        return new Promise<T>((resolve, reject) => {
          const request = (store as IDBObjectStore).add(newEntity);
          
          request.onsuccess = () => {
            resolve(newEntity);
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to create entity: ${request.error?.message}`));
          };
        });
      }
    );
  }

  async findById(id: string): Promise<T | null> {
    return this.client.executeTransaction(
      this.tableName,
      'readonly',
      async (store) => {
        return new Promise<T | null>((resolve, reject) => {
          const request = (store as IDBObjectStore).get(id);
          
          request.onsuccess = () => {
            resolve(request.result || null);
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to find entity: ${request.error?.message}`));
          };
        });
      }
    );
  }

  async findAll(): Promise<T[]> {
    return this.client.executeTransaction(
      this.tableName,
      'readonly',
      async (store) => {
        return new Promise<T[]>((resolve, reject) => {
          const request = (store as IDBObjectStore).getAll();
          
          request.onsuccess = () => {
            resolve(request.result || []);
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to find all entities: ${request.error?.message}`));
          };
        });
      }
    );
  }

  async findBy(criteria: Partial<T>): Promise<T[]> {
    const allEntities = await this.findAll();
    
    return allEntities.filter(entity => {
      return Object.entries(criteria).every(([key, value]) => {
        const entityValue = (entity as any)[key];
        if (value instanceof Date && entityValue instanceof Date) {
          return value.getTime() === entityValue.getTime();
        }
        return entityValue === value;
      });
    });
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error(`Entity with id ${id} not found`);
    }

    const updatedEntity: T = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };

    return this.client.executeTransaction(
      this.tableName,
      'readwrite',
      async (store) => {
        return new Promise<T>((resolve, reject) => {
          const request = (store as IDBObjectStore).put(updatedEntity);
          
          request.onsuccess = () => {
            resolve(updatedEntity);
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to update entity: ${request.error?.message}`));
          };
        });
      }
    );
  }

  async delete(id: string): Promise<void> {
    return this.client.executeTransaction(
      this.tableName,
      'readwrite',
      async (store) => {
        return new Promise<void>((resolve, reject) => {
          const request = (store as IDBObjectStore).delete(id);
          
          request.onsuccess = () => {
            resolve();
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to delete entity: ${request.error?.message}`));
          };
        });
      }
    );
  }
}