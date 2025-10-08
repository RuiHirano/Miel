import { mockTransactions, getCategoryName } from "../domains/transaction/mock";
import { lightTheme } from "../theme/theme";

export interface SankeyNode {
  id: string;
  nodeColor?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export const createSankeyData = (
  year: number = 2024,
  month: number = 1
): SankeyData => {
  // 指定した月の取引データをフィルタリング
  const monthTransactions = mockTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year && txnDate.getMonth() === month - 1;
  });

  // 収入と支出を分離
  const incomeTransactions = monthTransactions.filter(
    (txn) => txn.type === "income"
  );
  const expenseTransactions = monthTransactions.filter(
    (txn) => txn.type === "expense"
  );

  // ノードの作成
  const nodes: SankeyNode[] = [];

  // 収入カテゴリのノード
  const incomeCategories = [
    ...new Set(incomeTransactions.map((txn) => txn.categoryId)),
  ];
  incomeCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    nodes.push({
      id: categoryName,
      nodeColor: lightTheme.palette.chart?.income || "#2AA693", // 収入は緑色
    });
  });

  // 中央の「資金」ノード
  nodes.push({
    id: "資金",
    nodeColor: lightTheme.palette.chart?.neutral || "#4B5563", // 中立色
  });

  // 支出カテゴリのノード
  const expenseCategories = [
    ...new Set(expenseTransactions.map((txn) => txn.categoryId)),
  ];
  expenseCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    nodes.push({
      id: categoryName,
      nodeColor: lightTheme.palette.chart?.expense || "#DC2626", // 支出は赤色
    });
  });

  // リンクの作成
  const links: SankeyLink[] = [];

  // 収入カテゴリから資金へのリンク
  incomeCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = incomeTransactions
      .filter((txn) => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: categoryName,
        target: "資金",
        value: totalAmount,
        color: "#64b5f6", // 収入側のリンクは薄い青色
      });
    }
  });

  // 資金から支出カテゴリへのリンク
  expenseCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = expenseTransactions
      .filter((txn) => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: "資金",
        target: categoryName,
        value: totalAmount,
        color: "#ef5350", // 支出側のリンクは薄い赤色
      });
    }
  });

  return { nodes, links };
};

// サンプルデータ
export const sampleSankeyData: SankeyData = createSankeyData(2024, 1);

export const createSankeyDataByDescription = (
  year: number = 2024,
  month: number = 1
): SankeyData => {
  // 指定した月の取引データをフィルタリング
  const monthTransactions = mockTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === year && txnDate.getMonth() === month - 1;
  });

  // 収入と支出を分離
  const incomeTransactions = monthTransactions.filter(
    (txn) => txn.type === "income"
  );
  const expenseTransactions = monthTransactions.filter(
    (txn) => txn.type === "expense"
  );

  // ノードの作成
  const nodes: SankeyNode[] = [];

  // 収入摘要のノード
  const incomeDescriptions = [
    ...new Set(incomeTransactions.map((txn) => txn.description)),
  ];
  incomeDescriptions.forEach((description) => {
    nodes.push({
      id: description,
      nodeColor: lightTheme.palette.chart?.income || "#2AA693", // 収入は緑色
    });
  });

  // 中央の「資金」ノード
  nodes.push({
    id: "資金",
    nodeColor: lightTheme.palette.chart?.neutral || "#4B5563", // 中立色
  });

  // 支出摘要のノード
  const expenseDescriptions = [
    ...new Set(expenseTransactions.map((txn) => txn.description)),
  ];
  expenseDescriptions.forEach((description) => {
    nodes.push({
      id: description,
      nodeColor: lightTheme.palette.chart?.expense || "#DC2626", // 支出は赤色
    });
  });

  // リンクの作成
  const links: SankeyLink[] = [];

  // 収入摘要から資金へのリンク
  incomeDescriptions.forEach((description) => {
    const totalAmount = incomeTransactions
      .filter((txn) => txn.description === description)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: description,
        target: "資金",
        value: totalAmount,
        color: "#64b5f6", // 収入側のリンクは薄い青色
      });
    }
  });

  // 資金から支出摘要へのリンク
  expenseDescriptions.forEach((description) => {
    const totalAmount = expenseTransactions
      .filter((txn) => txn.description === description)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: "資金",
        target: description,
        value: totalAmount,
        color: "#ef5350", // 支出側のリンクは薄い赤色
      });
    }
  });

  return { nodes, links };
};

