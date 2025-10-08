import { useEffect, useState, useContext } from 'react';
import { DatabaseInitializer } from '../core/database';
import { DemoModeContext } from '../contexts/DemoModeContext';
import { DatabaseProviderFactory } from '../core/database/database-provider';

export interface DatabaseState {
  isInitializing: boolean;
  isReady: boolean;
  error: string | null;
  isDemo: boolean;
}

export function useDatabase(): DatabaseState {
  const demoContext = useContext(DemoModeContext);
  const isDemo = demoContext?.isDemo ?? true;
  
  const [state, setState] = useState<DatabaseState>({
    isInitializing: true,
    isReady: false,
    error: null,
    isDemo,
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setState(prev => ({ ...prev, isInitializing: true, isDemo }));
        
        if (isDemo) {
          // Use mock provider for demo mode
          await DatabaseProviderFactory.switchProvider('mock');
          setState({
            isInitializing: false,
            isReady: true,
            error: null,
            isDemo: true,
          });
        } else {
          // Use IndexedDB for real mode
          await DatabaseProviderFactory.switchProvider('indexeddb');
          
          if (!DatabaseInitializer.isReady()) {
            await DatabaseInitializer.initialize();
            await DatabaseInitializer.createDefaultCategories();
          }
          
          setState({
            isInitializing: false,
            isReady: true,
            error: null,
            isDemo: false,
          });
        }
      } catch (error) {
        setState({
          isInitializing: false,
          isReady: false,
          error: error instanceof Error ? error.message : 'Failed to initialize database',
          isDemo,
        });
      }
    };

    initializeDatabase();
  }, [isDemo]);

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
    isDemo: dbState.isDemo,
  };
}