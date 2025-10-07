import { Box, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SectionContainer from "../common/SectionContainer";

const AllTransactionsSection = () => {
  return (
    <SectionContainer
      title="全ての出入金"
      description="最近の取引履歴を一覧で確認し、詳細を管理できます"
      icon={<ReceiptLongIcon />}
    >
      <Box
        sx={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          borderRadius: 1,
        }}
      >
        <Typography color="text.secondary">取引リストエリア</Typography>
      </Box>
    </SectionContainer>
  );
};

export default AllTransactionsSection;
