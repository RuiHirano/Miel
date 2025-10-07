import { User } from "./types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "john.doe@example.com",
    createdAt: new Date("2024-01-01T10:00:00"),
    updatedAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "user-2", 
    email: "jane.smith@example.com",
    createdAt: new Date("2024-01-02T09:15:00"),
    updatedAt: new Date("2024-01-10T16:45:00"),
  },
  {
    id: "user-3",
    email: "mike.johnson@example.com", 
    createdAt: new Date("2024-01-03T11:30:00"),
    updatedAt: new Date("2024-01-12T13:20:00"),
  },
  {
    id: "user-4",
    email: "sarah.wilson@example.com",
    createdAt: new Date("2024-01-05T08:45:00"),
    updatedAt: new Date("2024-01-18T17:10:00"),
  },
  {
    id: "user-5",
    email: "alex.brown@example.com",
    createdAt: new Date("2024-01-07T14:20:00"),
    updatedAt: new Date("2024-01-20T10:55:00"),
  },
];

// 現在のユーザー（ログインユーザー）
export const currentUser: User = mockUsers[0];

// ユーザーIDからユーザー情報を取得するヘルパー関数
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// メールアドレスからユーザー情報を取得するヘルパー関数
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};