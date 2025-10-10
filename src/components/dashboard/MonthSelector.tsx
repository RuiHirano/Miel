import {
  CalendarMonth as CalendarMonthIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface MonthSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const MonthSelector = ({ selectedDate, onDateChange }: MonthSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // selectedDateがnullの場合は今月を使用
  const currentDate = selectedDate || new Date();

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  const formatShortMonth = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
    }).format(date);
  };

  const handleMonthMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMonthMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMonthSelect = (monthsOffset: number) => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + monthsOffset);
    onDateChange(newDate);
    handleMonthMenuClose();
  };

  // Generate list of recent months (past 12 months)
  const recentMonths = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      label: formatShortMonth(date),
      offset: -i,
      date: date,
    };
  });

  const isFutureMonth = () => {
    const now = new Date();
    return currentDate > now;
  };

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CalendarMonthIcon
          sx={{ mr: 1, fontSize: 28, color: "primary.main" }}
        />

        <IconButton onClick={handlePreviousMonth} size="large">
          <ChevronLeftIcon />
        </IconButton>

        <Button
          onClick={handleMonthMenuClick}
          sx={{
            fontSize: "1.2rem",
            fontWeight: "medium",
            minWidth: 160,
          }}
        >
          {formatMonth(currentDate)}
        </Button>

        <IconButton
          onClick={handleNextMonth}
          disabled={isFutureMonth()}
          size="large"
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      {/* Month selection menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMonthMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem disabled>
          <Typography variant="caption" color="text.secondary">
            最近の月を選択
          </Typography>
        </MenuItem>
        {recentMonths.map((month) => (
          <MenuItem
            key={month.offset}
            onClick={() => handleMonthSelect(month.offset)}
            selected={
              month.date.getFullYear() === currentDate.getFullYear() &&
              month.date.getMonth() === currentDate.getMonth()
            }
          >
            {month.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default MonthSelector;
