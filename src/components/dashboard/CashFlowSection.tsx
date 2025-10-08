import {
  Box,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ResponsiveSankey } from "@nivo/sankey";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SectionContainer from "../common/SectionContainer";
import {
  createSankeyData,
  createSankeyDataByDescription,
} from "../../utils/sankeyData";
import { mockTransactions } from "../../domains/transaction/mock";
import { useState } from "react";

const CashFlowSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [viewBy, setViewBy] = useState("category"); // 'category' or 'description'

  const sankeyData = viewBy === "category" ? createSankeyData(2024, 1) : createSankeyDataByDescription(2024, 1);

  const handleViewByChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewBy: string
  ) => {
    if (newViewBy !== null) {
      setViewBy(newViewBy);
    }
  };

  // Calculate totals for the current month
  const monthTransactions = mockTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === 2024 && txnDate.getMonth() === 0; // January
  });

  const totalIncome = monthTransactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpense = monthTransactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <SectionContainer
      title="収支の流れ"
      description="収入と支出のカテゴリ別内訳を視覚的に把握できます"
      icon={<AccountBalanceWalletIcon />}
    >
      <Stack spacing={2}>
        {/* Summary Cards */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUpIcon sx={{ color: "chart.income", fontSize: 20 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                収入
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
              {formatAmount(totalIncome)}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingDownIcon sx={{ color: "chart.expense", fontSize: 20 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                支出
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
              {formatAmount(totalExpense)}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccountBalanceIcon
                sx={{
                  color: balance >= 0 ? "chart.income" : "chart.expense",
                  fontSize: 20,
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                収支
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
              {formatAmount(balance)}
            </Typography>
          </Paper>
        </Stack>

        {/* View By Toggle */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <ToggleButtonGroup
            value={viewBy}
            exclusive
            onChange={handleViewByChange}
            aria-label="表示切替"
            size="small"
          >
            <ToggleButton value="category" aria-label="カテゴリ別" sx={{ width: '100px' }}>
              カテゴリ別
            </ToggleButton>
            <ToggleButton value="description" aria-label="摘要別" sx={{ width: '100px' }}>
              摘要別
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Sankey Diagram */}
        <Box
          sx={{
            height: 400,
            width: "100%",
          }}
        >
          <ResponsiveSankey
            data={sankeyData}
            margin={{
              top: 20,
              right: isMobile ? 40 : 80,
              bottom: 20,
              left: isMobile ? 30 : 50,
            }}
            align="justify"
            colors={(node) => node.nodeColor || "#757575"}
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={18}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderColor={{
              from: "color",
              modifiers: [["darker", 0.8]],
            }}
            nodeBorderRadius={2}
            linkOpacity={0.5}
            linkContract={3}
            enableLinkGradient={false}
            linkHoverOthersOpacity={0.5}
            linkTooltip={() => null}
            labelPosition="outside"
            labelOrientation="horizontal"
            labelPadding={isMobile ? 8 : 16}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1]],
            }}
            legends={[]}
            animate={false}
            motionConfig="wobbly"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default CashFlowSection;
