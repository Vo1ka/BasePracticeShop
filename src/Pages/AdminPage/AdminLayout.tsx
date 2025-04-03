import { Outlet, Link } from 'react-router-dom';
import './adminlayout.css';
import Header from '../../components/Header/Header';

export const AdminLayout = () => {
  return (
    <> 
    <div className="admin-header-wrapper">
    <Header showSearch={false} />
    </div>
    <div className="admin-container">
    <aside className="admin-sidebar">
      <nav>
        <Link to="products">Товары</Link>
        <Link to="users">Пользователи</Link>
        <Link to="/" className="exit-admin">← На сайт</Link>
      </nav>
    </aside>
    <main className="admin-content">
      <Outlet />
    </main>
  </div>
    </>
  );
};