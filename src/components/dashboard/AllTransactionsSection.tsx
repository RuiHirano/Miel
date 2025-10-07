import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Pagination,
  Stack,
  useTheme,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SectionContainer from "../common/SectionContainer";
import {
  mockTransactions,
  getCategoryName,
} from "../../domains/transaction/mock";
import { useState } from "react";

const AllTransactionsSection = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  // 最新の取引から表示（日付降順）
  const sortedTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ページネーション用の計算
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageTransactions = sortedTransactions.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const formatAmount = (amount: number, type: string) => {
    const formatted = amount.toLocaleString("ja-JP");
    return type === "income" ? `+¥${formatted}` : `-¥${formatted}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <SectionContainer
      title="全ての出入金"
      description="最近の取引履歴を一覧で確認し、詳細を管理できます"
      icon={<ReceiptLongIcon />}
      expandable
    >
      <TableContainer component={Paper}>
        <Table aria-label="取引履歴テーブル">
          <TableHead>
            <TableRow>
              <TableCell>日時</TableCell>
              <TableCell>カテゴリ</TableCell>
              <TableCell>説明</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell align="center">種別</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(transaction.date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getCategoryName(transaction.categoryId)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {transaction.description || "—"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{
                      color:
                        transaction.type === "income"
                          ? theme.palette.chart?.income || "#2AA693"
                          : theme.palette.chart?.expense || "#DC2626",
                    }}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={transaction.type === "income" ? "収入" : "支出"}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor:
                        transaction.type === "income"
                          ? theme.palette.chart?.income || "#2AA693"
                          : theme.palette.chart?.expense || "#DC2626",
                      color:
                        transaction.type === "income"
                          ? theme.palette.chart?.income || "#2AA693"
                          : theme.palette.chart?.expense || "#DC2626",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="medium"
            showFirstButton
            showLastButton
          />
          <Typography variant="body2" color="text.secondary">
            {sortedTransactions.length}件中 {startIndex + 1}-
            {Math.min(endIndex, sortedTransactions.length)}件を表示
          </Typography>
        </Stack>
      )}
    </SectionContainer>
  );
};

export default AllTransactionsSection;
