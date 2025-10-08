import React, { createContext, useContext, ReactNode } from 'react';
import { CircularProgress, Box, Alert, Typography } from '@mui/material';
import { useDatabase } from '../../hooks/useDatabase';

interface DatabaseContextType {
  isReady: boolean;
  isInitializing: boolean;
  error: string | null;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabaseContext must be used within a DatabaseProvider');
  }
  return context;
};

interface DatabaseProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
  fallback
}) => {
  const databaseState = useDatabase();

  if (databaseState.error) {
    return fallback || (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 3
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            データベースエラー
          </Typography>
          <Typography variant="body2">
            {databaseState.error}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (databaseState.isInitializing) {
    return fallback || (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary">
          データベースを初期化しています...
        </Typography>
      </Box>
    );
  }

  return (
    <DatabaseContext.Provider value={databaseState}>
      {children}
    </DatabaseContext.Provider>
  );
};