# Database Architecture Documentation

This document explains the database architecture implemented for the Miel application, featuring IndexedDB for local storage with a clean abstraction layer for future DynamoDB migration.

## Architecture Overview

The database architecture follows a layered approach:

```
┌─────────────────────────────────────┐
│           Service Layer              │
│  (Business Logic & Domain Services) │
├─────────────────────────────────────┤
│         Repository Layer            │
│    (Data Access & CRUD Operations)  │
├─────────────────────────────────────┤
│        Database Provider Layer      │
│    (IndexedDB/DynamoDB Abstraction) │
├─────────────────────────────────────┤
│        IndexedDB Implementation     │
│      (Local Browser Storage)        │
└─────────────────────────────────────┘
```

## Key Components

### 1. Core Database Layer (`src/core/database/`)

#### Interfaces (`interfaces.ts`)
- `IRepository<T>`: Generic repository interface for CRUD operations
- `IDatabaseProvider`: Factory interface for creating repositories
- `DatabaseEntity`: Base interface for all database entities

#### Database Provider (`database-provider.ts`)
- `DatabaseProviderFactory`: Factory for creating database providers
- Supports switching between IndexedDB and future DynamoDB implementations

#### IndexedDB Implementation (`indexeddb/`)
- `IndexedDBClient`: Low-level IndexedDB operations
- `BaseIndexedDBRepository`: Generic repository implementation
- `IndexedDBProvider`: IndexedDB-specific provider

### 2. Domain Layer

Each domain has its own repository and service:

#### Domains
- **Feedback**: AI feedback and insights
- **Organization**: User organizations and groups
- **Transaction**: Financial transactions and categories
- **User**: User account management

#### Structure for each domain:
```
src/domains/[domain]/
├── types.ts              # TypeScript interfaces
├── repositories/         # Data access layer
└── services/            # Business logic layer
```

### 3. React Integration

#### Hooks (`src/hooks/useDatabase.ts`)
- `useDatabase()`: Initialize and monitor database state
- `useDatabaseServices()`: Get typed service instances

#### Components (`src/components/common/DatabaseProvider.tsx`)
- `DatabaseProvider`: React context provider for database state
- Handles loading and error states

## Usage Examples

### 1. Basic Setup

```tsx
// In your App.tsx
import { DatabaseProvider } from './components/common/DatabaseProvider';

function App() {
  return (
    <DatabaseProvider>
      <YourAppComponents />
    </DatabaseProvider>
  );
}
```

### 2. Using Services in Components

```tsx
import { useState, useEffect } from 'react';
import { FeedbackService, AIFeedback } from '../core/database';
import { useDatabase } from '../hooks/useDatabase';

function FeedbackComponent() {
  const { isReady } = useDatabase();
  const [feedbacks, setFeedbacks] = useState<AIFeedback[]>([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      if (!isReady) return;
      
      const service = new FeedbackService();
      const data = await service.getAllFeedbacks();
      setFeedbacks(data);
    };

    loadFeedbacks();
  }, [isReady]);

  return (
    <div>
      {feedbacks.map(feedback => (
        <div key={feedback.id}>{feedback.title}</div>
      ))}
    </div>
  );
}
```

### 3. Creating New Records

```tsx
import { TransactionService } from '../core/database';

const service = new TransactionService();

// Create a new transaction
const transaction = await service.createTransaction({
  userId: 'user-123',
  organizationId: 'org-456',
  type: 'expense',
  amount: 1500,
  categoryId: 'category-789',
  description: 'Coffee purchase',
  date: new Date()
});
```

### 4. Complex Queries

```tsx
import { TransactionService } from '../core/database';

const service = new TransactionService();

// Get monthly summary
const summary = await service.getTransactionSummary(
  'org-123', 
  new Date('2024-10-01'), 
  new Date('2024-10-31')
);

// Get trends over time
const trends = await service.getMonthlyTrends('org-123', 6);
```

## Available Services

### FeedbackService
- `createFeedback()`: Create new AI feedback
- `getAllFeedbacks()`: Get all feedbacks
- `getFeedbacksByPriority()`: Filter by priority
- `getDashboardFeedbacks()`: Get organized dashboard data
- `markFeedbackAsRead()`: Update feedback status

### TransactionService
- `createTransaction()`: Create new transaction
- `getTransactionsByMonth()`: Get transactions for specific month
- `getTransactionSummary()`: Get income/expense summary
- `getMonthlyTrends()`: Get historical trends
- `createCategory()`: Create transaction category

### OrganizationService
- `createOrganization()`: Create new organization
- `getOrganizationsByUserId()`: Get user's organizations
- `generateUniqueSlug()`: Generate URL-friendly slug
- `createPersonalOrganization()`: Create personal org for user

### UserService
- `createUser()`: Create new user account
- `getUserByEmail()`: Find user by email
- `findOrCreateUser()`: Find existing or create new user
- `isEmailAvailable()`: Check email availability

## Database Schema

### Tables
- `users`: User accounts
- `organizations`: User organizations
- `transactions`: Financial transactions
- `transaction_categories`: Transaction categories
- `feedbacks`: AI feedback and insights

### Relationships
- Users → Organizations (1:many)
- Organizations → Transactions (1:many)
- Categories → Transactions (1:many)
- Feedbacks are standalone entities

## Future DynamoDB Migration

The architecture is designed for easy migration to DynamoDB:

1. **Interfaces**: All operations use generic interfaces
2. **Service Layer**: Business logic is independent of storage
3. **Provider Pattern**: Easy to swap implementations
4. **Type Safety**: Full TypeScript support maintained

To migrate:
1. Implement `DynamoDBProvider` class
2. Update `DatabaseProviderFactory` to support 'dynamodb' type
3. No changes needed in service layer or components

## Performance Considerations

### IndexedDB Optimizations
- Automatic indexing on common query fields
- Efficient range queries for date-based operations
- Transaction-based operations for consistency

### React Optimizations
- Database initialization happens once per session
- Services are instantiated per component (lightweight)
- Loading states prevent premature data access

## Error Handling

The system includes comprehensive error handling:

- **Database Connection**: Automatic retry and user feedback
- **Operation Failures**: Detailed error messages
- **Type Safety**: Compile-time error prevention
- **Validation**: Business rule enforcement in services

## Development Workflow

### Adding New Domains

1. Create domain types in `src/domains/[domain]/types.ts`
2. Implement repository in `src/domains/[domain]/repositories/`
3. Create service with business logic in `src/domains/[domain]/services/`
4. Add table configuration to `IndexedDBProvider`
5. Update exports in `src/core/database/index.ts`

### Testing Services

```tsx
import { DatabaseInitializer } from '../core/database';

// In tests, you can reset the database
beforeEach(async () => {
  await DatabaseInitializer.reset();
  await DatabaseInitializer.initialize();
});
```

## Migration from Mock Data

Existing components using mock data can be gradually migrated:

1. Keep existing mock-based components working
2. Create new database-enabled versions (e.g., `AIFeedbackSectionWithDB`)
3. Test new components thoroughly
4. Switch components one by one
5. Remove mock data dependencies

This approach ensures zero downtime during migration.