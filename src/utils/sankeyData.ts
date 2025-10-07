import { mockTransactions, getCategoryName } from "../domains/transaction/mock";

export interface SankeyNode {
  id: string;
  nodeColor?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export const createSankeyData = (year: number = 2024, month: number = 1): SankeyData => {
  // 指定した月の取引データをフィルタリング
  const monthTransactions = mockTransactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year && txnDate.getMonth() === month - 1;
  });

  // 収入と支出を分離
  const incomeTransactions = monthTransactions.filter(txn => txn.type === "income");
  const expenseTransactions = monthTransactions.filter(txn => txn.type === "expense");

  // ノードの作成
  const nodes: SankeyNode[] = [];
  
  // 収入カテゴリのノード
  const incomeCategories = [...new Set(incomeTransactions.map(txn => txn.categoryId))];
  incomeCategories.forEach(categoryId => {
    const categoryName = getCategoryName(categoryId);
    nodes.push({
      id: categoryName,
      nodeColor: "#2ed573", // 収入は緑色
    });
  });

  // 中央の「資金」ノード
  nodes.push({
    id: "資金",
    nodeColor: "#3742fa", // 青色
  });

  // 支出カテゴリのノード
  const expenseCategories = [...new Set(expenseTransactions.map(txn => txn.categoryId))];
  expenseCategories.forEach(categoryId => {
    const categoryName = getCategoryName(categoryId);
    nodes.push({
      id: categoryName,
      nodeColor: "#ff4757", // 支出は赤色
    });
  });

  // リンクの作成
  const links: SankeyLink[] = [];

  // 収入カテゴリから資金へのリンク
  incomeCategories.forEach(categoryId => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = incomeTransactions
      .filter(txn => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);
    
    if (totalAmount > 0) {
      links.push({
        source: categoryName,
        target: "資金",
        value: totalAmount,
      });
    }
  });

  // 資金から支出カテゴリへのリンク
  expenseCategories.forEach(categoryId => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = expenseTransactions
      .filter(txn => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);
    
    if (totalAmount > 0) {
      links.push({
        source: "資金",
        target: categoryName,
        value: totalAmount,
      });
    }
  });

  return { nodes, links };
};

// サンプルデータ
export const sampleSankeyData: SankeyData = createSankeyData(2024, 1);