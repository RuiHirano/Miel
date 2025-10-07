import {
  CalendarMonth as CalendarMonthIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
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

  const handlePreviousMonth = () => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
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

  const isCurrentMonth = () => {
    if (!selectedDate) return false;
    const now = new Date();
    return (
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth()
    );
  };

  const isFutureMonth = () => {
    if (!selectedDate) return false;
    const now = new Date();
    return selectedDate > now;
  };

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
      >
        {/* Left side - Month navigation */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarMonthIcon
            sx={{ mr: 1, fontSize: 28, color: "primary.main" }}
          />

          <IconButton
            onClick={handlePreviousMonth}
            size="large"
            disabled={!selectedDate}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Button
            onClick={handleMonthMenuClick}
            disabled={!selectedDate}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "medium",
              minWidth: 160,
            }}
          >
            {selectedDate ? formatMonth(selectedDate) : "全期間"}
          </Button>

          <IconButton
            onClick={handleNextMonth}
            disabled={!selectedDate || isFutureMonth()}
            size="large"
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>

        {/* Right side - Quick actions */}
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<TodayIcon />}
            onClick={handleToday}
            disabled={isCurrentMonth()}
            variant="outlined"
            size="small"
          >
            今月
          </Button>
          <Button
            onClick={() => onDateChange(null)}
            disabled={!selectedDate}
            variant="outlined"
            size="small"
          >
            全期間
          </Button>
        </Stack>
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
              selectedDate !== null &&
              month.date.getFullYear() === selectedDate.getFullYear() &&
              month.date.getMonth() === selectedDate.getMonth()
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
