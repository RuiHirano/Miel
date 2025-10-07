import { Box, Stack } from "@mui/material";
import AllTransactionsSection from "../components/dashboard/AllTransactionsSection";
import CashFlowSection from "../components/dashboard/CashFlowSection";
import MonthlyBalanceSection from "../components/dashboard/MonthlyBalanceSection";

const Dashboard = () => {
  return (
    <Box>
      <Stack spacing={3}>
        <MonthlyBalanceSection />
        <CashFlowSection />
        <AllTransactionsSection />
      </Stack>
    </Box>
  );
};

export default Dashboard;
