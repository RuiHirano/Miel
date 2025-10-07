import { Box, Stack } from "@mui/material";
import AllTransactionsSection from "../components/dashboard/AllTransactionsSection";
import CashFlowSection from "../components/dashboard/CashFlowSection";
import MonthlyBalanceSection from "../components/dashboard/MonthlyBalanceSection";
import AIFeedbackSection from "../components/dashboard/AIFeedbackSection";

const Dashboard = () => {
  return (
    <Box>
      <Stack spacing={3}>
        <MonthlyBalanceSection />
        <CashFlowSection />
        <AllTransactionsSection />
        <AIFeedbackSection />
      </Stack>
    </Box>
  );
};

export default Dashboard;
