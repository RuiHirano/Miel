export interface FinancialAccount {
  id: string;
  organizationId: string;
  name: string;
  type: "checking" | "savings" | "credit_card" | "investment" | "other";
  config: FinancialAccountCsvConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialAccountCsvConfig {
  startRowNum: number; // 何行目から読み込めば良いか (たまに最初にサマリーなどを載せる明細書もあるため)
  columns: {
    date: string; // 引き落とし日
    description: string; // 摘要
    description_detail: string; // 摘要内容
    debit: string; // お支払金額
    credit: string; // お預り金額
  };
}
