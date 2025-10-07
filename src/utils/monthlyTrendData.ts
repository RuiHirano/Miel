// 月ごとの収支推移データ
export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export const mockMonthlyData: MonthlyData[] = [
  {
    month: "5月",
    income: 500000,
    expense: 400000,
    balance: 100000,
  },
  {
    month: "6月", 
    income: 520000,
    expense: 600000,
    balance: -80000,
  },
  {
    month: "7月",
    income: 650000,
    expense: 550000,
    balance: 100000,
  },
  {
    month: "8月",
    income: 480000,
    expense: 520000,
    balance: -40000,
  },
  {
    month: "9月",
    income: 580000,
    expense: 450000,
    balance: 130000,
  },
];

// バーチャート用のデータ変換
export const transformToBarData = (data: MonthlyData[]) => {
  return data.map(item => ({
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
      data: data.map(item => ({
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