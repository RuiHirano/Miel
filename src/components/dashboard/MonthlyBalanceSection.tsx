import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SectionContainer from '../common/SectionContainer';

const MonthlyBalanceSection = () => {
  return (
    <SectionContainer 
      title="月ごとの収支の推移"
      description="過去12ヶ月間の収入と支出の推移をグラフで確認できます"
      icon={<TrendingUpIcon />}
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

export default MonthlyBalanceSection;