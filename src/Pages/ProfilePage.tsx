import { useState } from 'react';
import { useAppSelector, useAppDispatch } from './../hooks/useTypedRedux';
import { logout, updateUser } from './../store/slices/authSlice';
import './pages-css/profilepage.css';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import Header from '../components/Header/Header';

const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || ''
    });
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (user) {
        dispatch(updateUser({
          ...user,
          ...formData
        }));
      }
      setIsEditing(false);
    };
  
    if (!user) {
      return <div className="profile-error">Пользователь не авторизован</div>;
    }
  
    return (
      <>
      <Header showSearch={false}/>
      <div className="profile-container">
        <div className="profile-header">
          <h1>Личный кабинет</h1>
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
  
        <div className="profile-sections">
          {/* Секция профиля */}
          <section className="profile-section">
            <h2>Личные данные</h2>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Имя:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="cancel-button"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="profile-info">
                  <p><strong>Имя:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Роль:</strong> {user.role}</p>
                </div>
                <button onClick={handleEditToggle} className="edit-button">
                  Редактировать
                </button>
              </>
            )}
          </section>
  
          {/* Секция заказов */}
          <section className="orders-section">
            <h2>История заказов</h2>
            <OrderHistory />
          </section>
        </div>
      </div>
      </>
    );
  };
  
  export default ProfilePage;