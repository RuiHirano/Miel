import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AIFeedbackSection from "../components/dashboard/AIFeedbackSection";
import AllTransactionsSection from "../components/dashboard/AllTransactionsSection";
import CashFlowSection from "../components/dashboard/CashFlowSection";
import MonthlyBalanceSection from "../components/dashboard/MonthlyBalanceSection";
import MonthSelector from "../components/dashboard/MonthSelector";
import { useOrganization } from "../hooks/useOrganization";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { currentOrganization, loading, error } = useOrganization();

  // Initialize date from URL params on mount
  useEffect(() => {
    const period = searchParams.get("period");

    if (period) {
      // Parse YYYYMM format
      const year = parseInt(period.substring(0, 4));
      const month = parseInt(period.substring(4, 6));

      if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        setSelectedDate(date);
      } else {
        // Invalid period format, default to current month
        setSelectedDate(new Date());
      }
    } else {
      // No period parameter means all periods
      setSelectedDate(null);
    }
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    // Update URL params
    if (date === null) {
      // Remove period parameter for all periods
      setSearchParams({});
    } else {
      // Set period parameter in YYYYMM format
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const period = `${year}${month}`;
      setSearchParams({ period });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={3}>
        {currentOrganization && (
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {currentOrganization.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentOrganization.description}
            </Typography>
          </Box>
        )}
        <MonthlyBalanceSection />
        <MonthSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <CashFlowSection />
        <AllTransactionsSection selectedDate={selectedDate} />
        <AIFeedbackSection />
      </Stack>
    </Box>
  );
};

export default Dashboard;
