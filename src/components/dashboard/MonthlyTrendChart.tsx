import { Box, useTheme, useMediaQuery } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import {
  mockMonthlyData,
  transformToBarData,
  transformToLineData,
  formatAmount,
} from "../../utils/monthlyTrendData";

const MonthlyTrendChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const barData = transformToBarData(mockMonthlyData);
  const lineData = transformToLineData(mockMonthlyData);

  // データから最大値と最小値を計算
  const maxIncome = Math.max(...mockMonthlyData.map((d) => d.income));
  const maxExpense = Math.max(...mockMonthlyData.map((d) => d.expense));
  const maxBalance = Math.max(...mockMonthlyData.map((d) => d.balance));
  const minBalance = Math.min(...mockMonthlyData.map((d) => d.balance));

  // Y軸の範囲を計算（余白を20%追加）
  const maxValue = Math.max(maxIncome, maxBalance) * 1.2;
  const minValue = Math.min(-maxExpense, minBalance) * 1.2;

  // グリッド線を5段階に設定
  const gridStep = (maxValue - minValue) / 6;
  const gridValues = Array.from(
    { length: 7 },
    (_, i) => minValue + gridStep * i
  );

  return (
    <Box sx={{ height: 450, width: "100%", position: "relative" }}>
      {/* バーチャート */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <ResponsiveBar
          data={barData}
          keys={["収入", "支出"]}
          indexBy="month"
          margin={{
            top: 50,
            right: isMobile ? 20 : 80,
            bottom: 100,
            left: isMobile ? 60 : 100,
          }}
          padding={0.3}
          valueScale={{ type: "linear", min: minValue, max: maxValue }}
          indexScale={{ type: "band", round: true }}
          colors={({ id }) =>
            id === "収入"
              ? theme.palette.chart?.income || "#2AA693"
              : theme.palette.chart?.expense || "#DC2626"
          }
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -60,
            format: (value) => formatAmount(value),
          }}
          enableGridY={true}
          gridYValues={gridValues}
          enableLabel={false}
          legends={[]}
          animate={true}
        />
      </Box>

      {/* ラインチャート */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <ResponsiveLine
          data={lineData}
          margin={{
            top: 50,
            right: isMobile ? 20 : 80,
            bottom: 100,
            left: isMobile ? 60 : 100,
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: minValue,
            max: maxValue,
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors={[theme.palette.chart?.neutral || "#4B5563"]}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          animate={true}
          enableSlices="x"
          sliceTooltip={({ slice }) => (
            <Box
              sx={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <strong>{slice.points[0].data.xFormatted}</strong>
              </div>
              <div>
                収支: {formatAmount(Number(slice.points[0].data.yFormatted))}
              </div>
            </Box>
          )}
        />
      </Box>

      {/* カスタム凡例 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 3,
          zIndex: 2,
        }}
      >
        {/* 収入 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: theme.palette.chart?.income || "#2AA693",
              borderRadius: 0.5,
            }}
          />
          <span style={{ fontSize: "14px", color: "#374151" }}>収入</span>
        </Box>

        {/* 支出 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: theme.palette.chart?.expense || "#DC2626",
              borderRadius: 0.5,
            }}
          />
          <span style={{ fontSize: "14px", color: "#374151" }}>支出</span>
        </Box>

        {/* 収支 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 16,
              height: 2,
              backgroundColor: theme.palette.chart?.neutral || "#4B5563",
              borderRadius: 1,
            }}
          />
          <span style={{ fontSize: "14px", color: "#374151" }}>収支</span>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyTrendChart;
