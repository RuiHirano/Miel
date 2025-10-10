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
  useMediaQuery,
  Box,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SectionContainer from "../common/SectionContainer";
import {
  mockTransactions,
  getCategoryName,
} from "../../domains/transaction/mock";
import { useState } from "react";

interface AllTransactionsSectionProps {
  selectedDate: Date | null;
}

const AllTransactionsSection = ({
  selectedDate,
}: AllTransactionsSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  const getTitle = () => {
    if (!selectedDate) {
      return "全ての入出金";
    }
    const month = selectedDate.getMonth() + 1;
    return `${month}月の入出金`;
  };

  const getDescription = () => {
    if (!selectedDate) {
      return "全期間の取引履歴を一覧で確認し、詳細を管理できます";
    }
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    return `${year}年${month}月の取引履歴を一覧で確認し、詳細を管理できます`;
  };

  return (
    <SectionContainer
      title={getTitle()}
      description={getDescription()}
      icon={<ReceiptLongIcon />}
      expandable
    >
      {sortedTransactions.length === 0 ? (
        <Box
          sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <ReceiptLongIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
          <Typography variant="body1" color="text.secondary">
            データがありません
          </Typography>
        </Box>
      ) : (
        <>
          {isMobile ? (
            <Box>
              {currentPageTransactions.map((transaction, index) => (
                <Box
                  key={transaction.id}
                  sx={{
                    py: 2,
                    borderBottom:
                      index < currentPageTransactions.length - 1
                        ? "1px solid"
                        : "none",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {formatDate(transaction.date)}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        gutterBottom
                      >
                        {getCategoryName(transaction.categoryId)}
                      </Typography>
                      {transaction.description && (
                        <Typography variant="body2" color="text.secondary">
                          {transaction.description}
                        </Typography>
                      )}
                    </Box>
                    <Box textAlign="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          color:
                            transaction.type === "income"
                              ? theme.palette.chart?.income || "#2AA693"
                              : theme.palette.chart?.expense || "#DC2626",
                        }}
                      >
                        {formatAmount(transaction.amount, transaction.type)}
                      </Typography>
                      <Chip
                        label={transaction.type === "income" ? "収入" : "支出"}
                        size="small"
                        variant="outlined"
                        sx={{
                          mt: 0.5,
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
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
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
                          label={
                            transaction.type === "income" ? "収入" : "支出"
                          }
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
          )}
          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                showFirstButton={!isMobile}
                showLastButton={!isMobile}
              />
              <Typography variant="body2" color="text.secondary">
                {sortedTransactions.length}件中 {startIndex + 1}-
                {Math.min(endIndex, sortedTransactions.length)}件を表示
              </Typography>
            </Stack>
          )}
        </>
      )}
    </SectionContainer>
  );
};

export default AllTransactionsSection;
