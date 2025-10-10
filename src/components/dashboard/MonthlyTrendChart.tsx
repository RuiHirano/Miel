import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { line, curveMonotoneX } from "d3-shape";
import {
  mockMonthlyData,
  transformToBarData,
  formatAmount,
} from "../../utils/monthlyTrendData";

const MonthlyTrendChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // バーデータに収支（balance）を追加
  const barData = transformToBarData(mockMonthlyData).map((item, index) => ({
    ...item,
    balance: mockMonthlyData[index].balance,
  }));

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

  // カスタムレイヤー: ラインチャート
  const LineLayer = ({ xScale, yScale }: any) => {
    const lineColor = theme.palette.chart?.neutral || "#4B5563";

    try {
      // mockMonthlyDataから直接ラインポイントを生成
      const linePoints = mockMonthlyData.map((data) => {
        const bandwidth = xScale.bandwidth ? xScale.bandwidth() : 0;
        const x = xScale(data.month) + bandwidth / 2;
        const y = yScale(data.balance);

        return {
          month: data.month,
          x,
          y,
          balance: data.balance,
        };
      });

      // d3のlineジェネレーターを使用（曲線補間）
      const lineGenerator = line<any>()
        .x((d: any) => d.x)
        .y((d: any) => d.y)
        .curve(curveMonotoneX);

      return (
        <g>
          {/* ライン */}
          <path
            d={lineGenerator(linePoints) || ""}
            fill="none"
            stroke={lineColor}
            strokeWidth={2}
            style={{ pointerEvents: "none" }}
          />
          {/* ポイント */}
          {linePoints.map((point: any) => (
            <circle
              key={point.month}
              cx={point.x}
              cy={point.y}
              r={2}
              fill="#e2e2e2ff"
              stroke={lineColor}
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
            />
          ))}
        </g>
      );
    } catch (error) {
      console.error("LineLayer error:", error);
      return null;
    }
  };

  return (
    <Box sx={{ height: 450, width: "100%", position: "relative" }}>
      {/* バーチャート */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <ResponsiveBar
          data={barData}
          keys={["収入", "支出"]}
          indexBy="month"
          margin={{
            top: 40,
            right: isMobile ? 0 : 80,
            bottom: 80,
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
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "#e0e0e0",
                  strokeWidth: 1,
                },
              },
            },
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 0,
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
          layers={["grid", "axes", "bars", LineLayer, "markers", "legends"]}
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
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          zIndex: 2,
        }}
      >
        {/* 収入 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: theme.palette.chart?.income || "#2AA693",
              borderRadius: 0.5,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: "#374151", whiteSpace: "nowrap" }}
          >
            収入
          </Typography>
        </Box>

        {/* 支出 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: theme.palette.chart?.expense || "#DC2626",
              borderRadius: 0.5,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: "#374151", whiteSpace: "nowrap" }}
          >
            支出
          </Typography>
        </Box>

        {/* 収支 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 2,
              backgroundColor: theme.palette.chart?.neutral || "#4B5563",
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: "#374151", whiteSpace: "nowrap" }}
          >
            収支
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyTrendChart;
