import { Box, Paper, Stack, Typography } from "@mui/material";
import { ResponsiveSankey } from "@nivo/sankey";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SectionContainer from "../common/SectionContainer";
import { createSankeyData } from "../../utils/sankeyData";
import { mockTransactions } from "../../domains/transaction/mock";

const CashFlowSection = () => {
  const sankeyData = createSankeyData(2024, 1);

  // Calculate totals for the current month
  const monthTransactions = mockTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate.getFullYear() === 2024 && txnDate.getMonth() === 0; // January
  });

  const totalIncome = monthTransactions
    .filter(txn => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpense = monthTransactions
    .filter(txn => txn.type === "expense")
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
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
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
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
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
              <AccountBalanceIcon sx={{ color: balance >= 0 ? "chart.income" : "chart.expense", fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
                収支
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>
              {formatAmount(balance)}
            </Typography>
          </Paper>
        </Stack>

        {/* Sankey Diagram */}
        <Box
          sx={{
            height: 400,
            width: "100%",
          }}
        >
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 40, right: 80, bottom: 40, left: 50 }}
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
            nodeBorderRadius={3}
            linkOpacity={0.5}
            linkContract={3}
            enableLinkGradient={false}
            linkHoverOthersOpacity={0.5}
            linkTooltip={() => null}
            labelPosition="outside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1]],
            }}
            legends={[]}
            animate={true}
            motionConfig="wobbly"
          />
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default CashFlowSection;
