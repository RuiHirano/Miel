export interface IRepository<T> {
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findBy(criteria: Partial<T>): Promise<T[]>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IDatabaseProvider {
  getRepository<T extends DatabaseEntity>(tableName: string): IRepository<T>;
  initialize(): Promise<void>;
  close(): Promise<void>;
}

export interface DatabaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}