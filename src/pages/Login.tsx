import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ログイン画面</h1>
      <button onClick={() => navigate('/dashboard')}>ダッシュボードへ</button>
    </div>
  );
};

export default Login;