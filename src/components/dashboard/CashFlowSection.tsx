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

  const sankeyData =
    viewBy === "category"
      ? createSankeyData(2024, 1)
      : createSankeyDataByDescription(2024, 1);

  const handleViewByChange = (
    _event: React.MouseEvent<HTMLElement>,
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

  const formatBalanceForSankey = (amount: number) => {
    const man = Math.round(amount / 10000);
    return `${man}万円`;
  };

  const truncateLabel = (label: string, maxLength = 10) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
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
            <ToggleButton
              value="category"
              aria-label="カテゴリ別"
              sx={{ width: "100px" }}
            >
              カテゴリ別
            </ToggleButton>
            <ToggleButton
              value="description"
              aria-label="摘要別"
              sx={{ width: "100px" }}
            >
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
          {monthTransactions.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <AccountBalanceWalletIcon
                sx={{ fontSize: 48, mb: 2, opacity: 0.3 }}
              />
              <Typography variant="body1" color="text.secondary">
                データがありません
              </Typography>
            </Box>
          ) : (
            <ResponsiveSankey
              data={sankeyData}
              margin={{
                top: 40,
                right: isMobile ? 0 : 80, // 右マージンを増やす
                bottom: 20,
                left: isMobile ? 0 : 80, // 左マージンも少し増やす
              }}
              align="justify"
              colors={(d: any) => (d.data ? d.data.color : d.color) || "#757575"}
              nodeOpacity={1}
              nodeHoverOthersOpacity={0.35}
              nodeThickness={18}
              nodeSpacing={12} // spacingを少し詰める
              nodeBorderWidth={0}
              nodeBorderColor={{
                from: "color",
                modifiers: [["darker", 0.8]],
              }}
              nodeBorderRadius={2}
              linkOpacity={0.5}
              linkContract={3}
              enableLinkGradient={true}
              linkHoverOthersOpacity={0.5}
              linkTooltip={() => null}
              enableLabels={false}
              legends={[]}
              layers={[
                "links",
                "nodes",
                ({ nodes }) => {
                  return (
                    <g>
                      {nodes.map((node) => {
                        const isBalanceNode = node.id === "収支";
                        if (isBalanceNode) {
                          return (
                            <g
                              transform={`translate(${node.x + node.width / 2}, ${
                                node.y - 20
                              })`}
                            >
                              <text
                                textAnchor="middle"
                                style={{
                                  fontSize: 10,
                                  fontWeight: "bold",
                                  fill: "#504e4eff",
                                }}
                              >
                                収支
                              </text>
                              <text
                                textAnchor="middle"
                                y={12} // 「収支」ラベルからの相対位置
                                style={{
                                  fontSize: 10,
                                  fontWeight: "bold",
                                  fill: "#504e4eff",
                                }}
                              >
                                {formatBalanceForSankey(totalIncome)}
                              </text>
                            </g>
                          );
                        }

                        const labelText = truncateLabel(
                          node.id as string,
                          viewBy === "description" ? 7 : 10
                        );

                        let amountToDisplay = node.value; // その他のノードはNivoが計算したvalue

                        const amountText = isBalanceNode
                          ? formatBalanceForSankey(amountToDisplay)
                          : formatAmount(amountToDisplay);

                        // ラベルと金額の表示位置を調整
                        let labelYOffset = 0; // ノードの中心からのYオフセット

                        let transformX = node.x + node.width / 2; // デフォルトはノードの中心
                        let textAnchor: "start" | "middle" | "end" = "middle";

                        // その他のノードはノードの内側に表示
                        // ノードが左側にあるか右側にあるかを判断
                        // node.x が小さいほど左側、大きいほど右側
                        if (node.x < 100) {
                          // 左側のノード (例: 収入カテゴリ、不足)
                          transformX = node.x + node.width + 4; // ノードの右端から少し右
                          textAnchor = "start";
                        } else if (node.x > 200) {
                          // 右側のノード (例: 支出カテゴリ、貯蓄)
                          transformX = node.x - 4; // ノードの左端から少し左
                          textAnchor = "end";
                        }

                        return (
                          <g
                            key={node.id}
                            transform={`translate(${transformX}, ${
                              node.y + node.height / 2
                            })`}
                          >
                            {/* ラベル */}
                            <text
                              textAnchor={textAnchor}
                              y={labelYOffset}
                              style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                fill: "#504e4eff",
                              }}
                            >
                              {labelText} {amountText}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                },
                "labels",
              ]}
              animate={false}
              motionConfig="wobbly"
            />
          )}
        </Box>
      </Stack>
    </SectionContainer>
  );
};

export default CashFlowSection;
