import { Transaction, TransactionCategory } from "./types";

const baseDate = new Date("2024-01-01T00:00:00");

export const mockTransactionCategories: TransactionCategory[] = [
  // 支出カテゴリ
  { id: "cat-1", name: "食費", icon: "🍽️", color: "#ff6b6b", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-2", name: "交通費", icon: "🚗", color: "#4ecdc4", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-3", name: "家賃", icon: "🏠", color: "#45b7d1", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-4", name: "光熱費", icon: "⚡", color: "#96ceb4", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-5", name: "通信費", icon: "📱", color: "#feca57", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-6", name: "医療費", icon: "🏥", color: "#ff9ff3", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-7", name: "娯楽費", icon: "🎮", color: "#54a0ff", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-8", name: "日用品", icon: "🧽", color: "#5f27cd", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-9", name: "衣服", icon: "👔", color: "#00d2d3", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-10", name: "教育費", icon: "📚", color: "#ff6348", createdAt: baseDate, updatedAt: baseDate },
  
  // 収入カテゴリ
  { id: "cat-11", name: "給与", icon: "💰", color: "#2ed573", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-12", name: "副業", icon: "💻", color: "#3742fa", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-13", name: "投資", icon: "📈", color: "#ff4757", createdAt: baseDate, updatedAt: baseDate },
  { id: "cat-14", name: "その他収入", icon: "💸", color: "#ffa502", createdAt: baseDate, updatedAt: baseDate },
];

export const mockTransactions: Transaction[] = [
  {
    id: "txn-1",
    userId: "user-1", 
    organizationId: "org-1",
    type: "expense",
    amount: 1200,
    categoryId: "cat-1",
    description: "昼食（カフェ）",
    date: new Date("2024-01-15T12:30:00"),
    createdAt: new Date("2024-01-15T12:35:00"),
    updatedAt: new Date("2024-01-15T12:35:00"),
  },
  {
    id: "txn-2",
    userId: "user-1",
    organizationId: "org-1", 
    type: "expense",
    amount: 300000,
    categoryId: "cat-3",
    description: "家賃（1月分）",
    date: new Date("2024-01-01T09:00:00"),
    createdAt: new Date("2024-01-01T09:05:00"),
    updatedAt: new Date("2024-01-01T09:05:00"),
  },
  {
    id: "txn-3",
    userId: "user-1",
    organizationId: "org-1",
    type: "income",
    amount: 500000,
    categoryId: "cat-11",
    description: "給与（1月分）",
    date: new Date("2024-01-25T10:00:00"),
    createdAt: new Date("2024-01-25T10:00:00"),
    updatedAt: new Date("2024-01-25T10:00:00"),
  },
  {
    id: "txn-4",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 800,
    categoryId: "cat-2",
    description: "電車代",
    date: new Date("2024-01-16T08:15:00"),
    createdAt: new Date("2024-01-16T08:20:00"),
    updatedAt: new Date("2024-01-16T08:20:00"),
  },
  {
    id: "txn-5",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 15000,
    categoryId: "cat-4",
    description: "電気代（1月分）",
    date: new Date("2024-01-10T14:00:00"),
    createdAt: new Date("2024-01-10T14:00:00"),
    updatedAt: new Date("2024-01-10T14:00:00"),
  },
  {
    id: "txn-6",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 3500,
    categoryId: "cat-7",
    description: "映画鑑賞",
    date: new Date("2024-01-14T19:30:00"),
    createdAt: new Date("2024-01-14T21:00:00"),
    updatedAt: new Date("2024-01-14T21:00:00"),
  },
  {
    id: "txn-7",
    userId: "user-1",
    organizationId: "org-1",
    type: "income",
    amount: 50000,
    categoryId: "cat-12",
    description: "フリーランス案件",
    date: new Date("2024-01-20T16:00:00"),
    createdAt: new Date("2024-01-20T16:00:00"),
    updatedAt: new Date("2024-01-20T16:00:00"),
  },
  {
    id: "txn-8",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 2500,
    categoryId: "cat-8",
    description: "洗剤・シャンプー",
    date: new Date("2024-01-12T11:00:00"),
    createdAt: new Date("2024-01-12T11:00:00"),
    updatedAt: new Date("2024-01-12T11:00:00"),
  },
  {
    id: "txn-9",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 8000,
    categoryId: "cat-5",
    description: "携帯電話料金",
    date: new Date("2024-01-05T12:00:00"),
    createdAt: new Date("2024-01-05T12:00:00"),
    updatedAt: new Date("2024-01-05T12:00:00"),
  },
  {
    id: "txn-10",
    userId: "user-1",
    organizationId: "org-1",
    type: "expense",
    amount: 12000,
    categoryId: "cat-9",
    description: "冬服購入",
    date: new Date("2024-01-08T15:30:00"),
    createdAt: new Date("2024-01-08T15:30:00"),
    updatedAt: new Date("2024-01-08T15:30:00"),
  },
];

// カテゴリIDから名前を取得するヘルパー関数
export const getCategoryName = (categoryId: string): string => {
  const category = mockTransactionCategories.find(cat => cat.id === categoryId);
  return category?.name || "不明";
};

// カテゴリIDからアイコンを取得するヘルパー関数  
export const getCategoryIcon = (categoryId: string): string => {
  const category = mockTransactionCategories.find(cat => cat.id === categoryId);
  return category?.icon || "💰";
};

// 月別集計を取得するヘルパー関数
export const getMonthlyTotals = (year: number, month: number) => {
  const monthTransactions = mockTransactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year && txnDate.getMonth() === month - 1;
  });

  const totalIncome = monthTransactions
    .filter(txn => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpense = monthTransactions
    .filter(txn => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: monthTransactions.length,
  };
};