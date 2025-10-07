import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ダッシュボード画面</h1>
      <button onClick={() => navigate('/')}>ホームへ戻る</button>
    </div>
  );
};

export default Dashboard;