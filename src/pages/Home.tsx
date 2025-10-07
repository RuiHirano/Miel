import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ホーム画面</h1>
      <button onClick={() => navigate('/login')}>ログインへ</button>
    </div>
  );
};

export default Home;