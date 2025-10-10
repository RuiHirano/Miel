import { mockTransactions } from "../domains/transaction/mock";

// 月ごとの収支推移データ
export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

// mockTransactionsから月別データを生成
export const generateMonthlyData = (): MonthlyData[] => {
  // 年月ごとに集計
  const monthlyMap = new Map<string, { income: number; expense: number }>();

  mockTransactions.forEach((txn) => {
    const date = new Date(txn.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, "0")}`;

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, { income: 0, expense: 0 });
    }

    const data = monthlyMap.get(key)!;
    if (txn.type === "income") {
      data.income += txn.amount;
    } else {
      data.expense += txn.amount;
    }
  });

  // キーでソートして配列に変換
  const sortedEntries = Array.from(monthlyMap.entries()).sort(
    ([keyA], [keyB]) => keyA.localeCompare(keyB)
  );

  // MonthlyData形式に変換
  return sortedEntries.map(([key, data]) => {
    const [, monthNum] = key.split("-");
    const month = parseInt(monthNum);
    return {
      month: `${month}月`,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    };
  });
};

export const mockMonthlyData: MonthlyData[] = generateMonthlyData();

// バーチャート用のデータ変換
export const transformToBarData = (data: MonthlyData[]) => {
  return data.map((item) => ({
    month: item.month,
    収入: item.income,
    支出: -item.expense, // 支出は負の値で下向きに表示
  }));
};

// ラインチャート用のデータ変換
export const transformToLineData = (data: MonthlyData[]) => {
  return [
    {
      id: "収支",
      color: "#424242",
      data: data.map((item) => ({
        x: item.month,
        y: item.balance,
      })),
    },
  ];
};

// 金額フォーマット（万円単位）
export const formatAmount = (value: number): string => {
  const man = Math.round(value / 10000);
  return `${man}万円`;
};
