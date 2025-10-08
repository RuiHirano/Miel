import { mockTransactions, getCategoryName } from "../domains/transaction/mock";
import { lightTheme } from "../theme/theme";

export interface SankeyNode {
  id: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  startColor: string;
  endColor: string;
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
      color: lightTheme.palette.chart?.income || "#2AA693", // 収入は緑色
    });
  });

  // 中央の「収支」ノード
  nodes.push({
    id: "収支",
    color: lightTheme.palette.chart?.neutral || "#4B5563", // 中立色
  });

  // 支出カテゴリのノード
  const expenseCategories = [
    ...new Set(expenseTransactions.map((txn) => txn.categoryId)),
  ];
  expenseCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    nodes.push({
      id: categoryName,
      color: lightTheme.palette.chart?.expense || "#DC2626", // 支出は赤色
    });
  });

  // リンクの作成
  const links: SankeyLink[] = [];

  // 収入カテゴリから収支へのリンク
  incomeCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = incomeTransactions
      .filter((txn) => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: categoryName,
        target: "収支",
        value: totalAmount,
        startColor: "#2AA693",
        endColor: "#2AA693",
      });
    }
  });

  // 収支から支出カテゴリへのリンク
  expenseCategories.forEach((categoryId) => {
    const categoryName = getCategoryName(categoryId);
    const totalAmount = expenseTransactions
      .filter((txn) => txn.categoryId === categoryId)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: "収支",
        target: categoryName,
        value: totalAmount,
        startColor: "#ef5350",
        endColor: "#ef5350",
      });
    }
  });

  const totalIncomeAmount = incomeTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );
  const totalExpenseAmount = expenseTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );
  const balanceAmount = totalIncomeAmount - totalExpenseAmount;

  if (balanceAmount > 0) {
    // 「貯蓄」ノードの追加
    nodes.push({
      id: "貯蓄",
      color: lightTheme.palette.chart?.savings || "#10B981", // 貯蓄用の色
    });
    // 収支から貯蓄へのリンク
    links.push({
      source: "収支",
      target: "貯蓄",
      value: balanceAmount,
      startColor: "#10B981",
      endColor: "#10B981",
    });
  } else if (balanceAmount < 0) {
    // 「不足」ノードの追加
    nodes.push({
      id: "不足",
      color: lightTheme.palette.chart?.deficit || "#F43F5E", // 不足用の色
    });
    // 不足から収支へのリンク
    links.push({
      source: "不足",
      target: "収支",
      value: -balanceAmount, // 絶対値
      startColor: "#F43F5E",
      endColor: "#F43F5E",
    });
  }

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
    ...new Set(
      incomeTransactions
        .map((txn) => txn.description)
        .filter(Boolean) as string[]
    ),
  ];
  incomeDescriptions.forEach((description) => {
    nodes.push({
      id: description,
      color: lightTheme.palette.chart?.income || "#2AA693", // 収入は緑色
    });
  });

  // 中央の「収支」ノード
  nodes.push({
    id: "収支",
    color: lightTheme.palette.chart?.neutral || "#4B5563", // 中立色
  });

  // 支出摘要のノード
  const expenseDescriptions = [
    ...new Set(
      expenseTransactions
        .map((txn) => txn.description)
        .filter(Boolean) as string[]
    ),
  ];
  expenseDescriptions.forEach((description) => {
    nodes.push({
      id: description,
      color: lightTheme.palette.chart?.expense || "#ef5350", // 支出は赤色
    });
  });

  // リンクの作成
  const links: SankeyLink[] = [];

  // 収入摘要から収支へのリンク
  incomeDescriptions.forEach((description) => {
    const totalAmount = incomeTransactions
      .filter((txn) => txn.description === description)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: description,
        target: "収支",
        value: totalAmount,
        startColor: "#2AA693",
        endColor: "#2AA693",
      });
    }
  });

  // 収支から支出摘要へのリンク
  expenseDescriptions.forEach((description) => {
    const totalAmount = expenseTransactions
      .filter((txn) => txn.description === description)
      .reduce((sum, txn) => sum + txn.amount, 0);

    if (totalAmount > 0) {
      links.push({
        source: "収支",
        target: description,
        value: totalAmount,
        startColor: "#ef5350",
        endColor: "#ef5350",
      });
    }
  });

  const totalIncomeAmount = incomeTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );
  const totalExpenseAmount = expenseTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );
  const balanceAmount = totalIncomeAmount - totalExpenseAmount;

  if (balanceAmount > 0) {
    // 「貯蓄」ノードの追加
    nodes.push({
      id: "貯蓄",
      color: lightTheme.palette.chart?.savings || "#10B981", // 貯蓄用の色
    });
    // 収支から貯蓄へのリンク
    links.push({
      source: "収支",
      target: "貯蓄",
      value: balanceAmount,
      startColor: "#10B981",
      endColor: "#10B981",
    });
  } else if (balanceAmount < 0) {
    // 「不足」ノードの追加
    nodes.push({
      id: "不足",
      color: lightTheme.palette.chart?.deficit || "#F43F5E", // 不足用の色
    });
    // 不足から収支へのリンク
    links.push({
      source: "不足",
      target: "収支",
      value: -balanceAmount, // 絶対値
      startColor: "#F43F5E",
      endColor: "#F43F5E",
    });
  }

  return { nodes, links };
};