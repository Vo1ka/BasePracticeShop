// src/pages/LoginPage/LoginPage.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../src/hooks/useTypedRedux';
import { clearError, login, loginUser } from './../../src/store/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom';
import './pages-css/loginpage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector((state) => state.auth.error);
    const theme = useAppSelector((state) => state.theme.mode);
    useEffect(() => {
      // Очищаем ошибки при размонтировании
      return () => {
        dispatch(clearError());
      };
    }, [dispatch]);
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
          .unwrap()
          .then(() => navigate('/profile'))
          .catch((err) => {
            console.error('Ошибка авторизации:', err);
          });
    };
  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card">
        <h2>Вход в аккаунт</h2>
        <button onClick={() => dispatch(login({ 
            email: 'admin@test.com', 
            password: 'admin123', 
            role: 'admin' 
        }))}>
            <Link to={'/admin'}>Зайти как админ</Link>
        </button>
        <Link to={'/'}>Назад</Link>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        <div className="login-links">
          <button onClick={() => navigate('/register')}>Создать аккаунт</button>
          <button onClick={() => navigate('/reset-password')}>Забыли пароль?</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;