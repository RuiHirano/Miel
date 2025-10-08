import { IRepository, DatabaseEntity } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

export class MockRepository<T extends DatabaseEntity> implements IRepository<T> {
  private data: Map<string, T> = new Map();
  private tableName: string;

  constructor(tableName: string, initialData?: T[]) {
    this.tableName = tableName;
    if (initialData) {
      initialData.forEach(item => {
        this.data.set(item.id, item);
      });
    }
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date();
    const newEntity: T = {
      ...entity,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    } as T;

    this.data.set(newEntity.id, newEntity);
    return Promise.resolve(newEntity);
  }

  async findById(id: string): Promise<T | null> {
    return Promise.resolve(this.data.get(id) || null);
  }

  async findAll(): Promise<T[]> {
    return Promise.resolve(Array.from(this.data.values()));
  }

  async findBy(criteria: Partial<T>): Promise<T[]> {
    const allData = Array.from(this.data.values());
    
    return Promise.resolve(
      allData.filter(item => {
        return Object.entries(criteria).every(([key, value]) => {
          const itemValue = (item as any)[key];
          if (value instanceof Date && itemValue instanceof Date) {
            return value.getTime() === itemValue.getTime();
          }
          return itemValue === value;
        });
      })
    );
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const existing = this.data.get(id);
    if (!existing) {
      throw new Error(`Entity with id ${id} not found in ${this.tableName}`);
    }

    const updatedEntity: T = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };

    this.data.set(id, updatedEntity);
    return Promise.resolve(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    const success = this.data.delete(id);
    if (!success) {
      throw new Error(`Entity with id ${id} not found in ${this.tableName}`);
    }
    return Promise.resolve();
  }

  // Helper method to load data
  loadData(data: T[]): void {
    this.data.clear();
    data.forEach(item => {
      this.data.set(item.id, item);
    });
  }

  // Helper method to get all data
  getAllData(): T[] {
    return Array.from(this.data.values());
  }
}