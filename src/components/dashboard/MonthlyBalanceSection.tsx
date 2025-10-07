import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SectionContainer from '../common/SectionContainer';
import MonthlyTrendChart from './MonthlyTrendChart';

const MonthlyBalanceSection = () => {
  return (
    <SectionContainer 
      title="月ごとの収支の推移"
      description="過去12ヶ月間の収入と支出の推移をグラフで確認できます"
      icon={<TrendingUpIcon />}
    >
      <MonthlyTrendChart />
    </SectionContainer>
  );
};

export default MonthlyBalanceSection;