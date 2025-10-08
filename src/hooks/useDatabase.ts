import { useEffect, useState } from 'react';
import { DatabaseInitializer } from '../core/database';

export interface DatabaseState {
  isInitializing: boolean;
  isReady: boolean;
  error: string | null;
}

export function useDatabase(): DatabaseState {
  const [state, setState] = useState<DatabaseState>({
    isInitializing: true,
    isReady: false,
    error: null,
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        if (DatabaseInitializer.isReady()) {
          setState({
            isInitializing: false,
            isReady: true,
            error: null,
          });
          return;
        }

        setState(prev => ({ ...prev, isInitializing: true }));
        
        await DatabaseInitializer.initialize();
        await DatabaseInitializer.createDefaultCategories();
        
        setState({
          isInitializing: false,
          isReady: true,
          error: null,
        });
      } catch (error) {
        setState({
          isInitializing: false,
          isReady: false,
          error: error instanceof Error ? error.message : 'Failed to initialize database',
        });
      }
    };

    initializeDatabase();
  }, []);

  return state;
}

export function useDatabaseServices() {
  const dbState = useDatabase();
  
  if (!dbState.isReady) {
    return null;
  }

  const { 
    FeedbackService, 
    OrganizationService, 
    TransactionService, 
    UserService 
  } = require('../core/database');

  return {
    feedbackService: new FeedbackService(),
    organizationService: new OrganizationService(),
    transactionService: new TransactionService(),
    userService: new UserService(),
  };
}