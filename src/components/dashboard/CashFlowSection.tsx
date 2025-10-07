import { Box } from "@mui/material";
import { ResponsiveSankey } from "@nivo/sankey";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SectionContainer from "../common/SectionContainer";
import { createSankeyData } from "../../utils/sankeyData";

const CashFlowSection = () => {
  const sankeyData = createSankeyData(2024, 1);

  return (
    <SectionContainer
      title="収支の流れ"
      description="収入と支出のカテゴリ別内訳を視覚的に把握できます"
      icon={<AccountBalanceWalletIcon />}
    >
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
    </SectionContainer>
  );
};

export default CashFlowSection;
