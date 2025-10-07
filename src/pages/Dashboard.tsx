import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AllTransactionsSection from "../components/dashboard/AllTransactionsSection";
import CashFlowSection from "../components/dashboard/CashFlowSection";
import MonthlyBalanceSection from "../components/dashboard/MonthlyBalanceSection";
import AIFeedbackSection from "../components/dashboard/AIFeedbackSection";
import MonthSelector from "../components/dashboard/MonthSelector";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Initialize date from URL params on mount
  useEffect(() => {
    const period = searchParams.get("period");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (period === "all") {
      setSelectedDate(null);
    } else if (year && month) {
      const date = new Date(parseInt(year), parseInt(month) - 1);
      setSelectedDate(date);
    } else {
      // Default to current month if no params
      setSelectedDate(new Date());
    }
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    
    // Update URL params
    const newParams = new URLSearchParams();
    
    if (date === null) {
      newParams.set("period", "all");
    } else {
      newParams.set("year", date.getFullYear().toString());
      newParams.set("month", (date.getMonth() + 1).toString());
    }
    
    setSearchParams(newParams);
  };

  return (
    <Box>
      <Stack spacing={3}>
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
