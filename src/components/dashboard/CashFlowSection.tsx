import { Box, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SectionContainer from '../common/SectionContainer';

const CashFlowSection = () => {
  return (
    <SectionContainer 
      title="収支の流れ"
      description="収入と支出のカテゴリ別内訳を視覚的に把握できます"
      icon={<AccountBalanceWalletIcon />}
    >
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
          borderRadius: 1,
        }}
      >
        <Typography color="text.secondary">
          グラフエリア
        </Typography>
      </Box>
    </SectionContainer>
  );
};

export default CashFlowSection;