import { FinancialAccount } from "./types";

export const mockFinancialAccounts: FinancialAccount[] = [
  {
    id: "fa-1",
    organizationId: "org-1",
    name: "USJ 銀行",
    type: "checking",
    config: {
      startRowNum: 0,
      columns: {
        date: "利用日",
        description: "ご利用店名及び商品名",
        description_detail: "支払区分名称",
        debit: "利用金額",
        credit: "",
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "fa-2",
    organizationId: "org-1",
    name: "Amex Gold",
    type: "credit_card",
    config: {
      startRowNum: 0,
      columns: {
        date: "利用日",
        description: "ご利用店名及び商品名",
        description_detail: "支払区分名称",
        debit: "利用金額",
        credit: "",
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
