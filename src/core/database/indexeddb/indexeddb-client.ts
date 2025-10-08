export interface IndexedDBConfig {
  databaseName: string;
  version: number;
  tables: {
    name: string;
    keyPath: string;
    indexes?: Array<{
      name: string;
      keyPath: string | string[];
      options?: IDBIndexParameters;
    }>;
  }[];
}

export class IndexedDBClient {
  private db: IDBDatabase | null = null;
  private config: IndexedDBConfig;

  constructor(config: IndexedDBConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.databaseName, this.config.version);

      request.onerror = () => {
        reject(new Error(`Failed to open database: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        for (const table of this.config.tables) {
          if (!db.objectStoreNames.contains(table.name)) {
            const store = db.createObjectStore(table.name, {
              keyPath: table.keyPath,
              autoIncrement: false,
            });

            if (table.indexes) {
              for (const index of table.indexes) {
                store.createIndex(index.name, index.keyPath, index.options);
              }
            }
          }
        }
      };
    });
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  getDatabase(): IDBDatabase {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }

  async executeTransaction<T>(
    storeNames: string | string[],
    mode: IDBTransactionMode,
    operation: (stores: IDBObjectStore | IDBObjectStore[]) => Promise<T>
  ): Promise<T> {
    const db = this.getDatabase();
    const transaction = db.transaction(storeNames, mode);
    
    return new Promise((resolve, reject) => {
      transaction.onerror = () => {
        reject(new Error(`Transaction failed: ${transaction.error?.message}`));
      };

      transaction.oncomplete = () => {
      };

      try {
        const stores = Array.isArray(storeNames)
          ? storeNames.map(name => transaction.objectStore(name))
          : transaction.objectStore(storeNames);

        operation(stores).then(resolve).catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }
}