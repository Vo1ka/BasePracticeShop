import { Link } from 'react-router-dom';
import './pages-css/pagenotfound.css';
import Header from '../components/Header/Header';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
        <Header showSearch={false}/>
      <h1>404 — Страница не найдена</h1>
      <p>Извините, такой страницы не существует.</p>
      <Link to="/" className="home-link">Вернуться на главную</Link>
    </div>
  );
};

export default PageNotFound;