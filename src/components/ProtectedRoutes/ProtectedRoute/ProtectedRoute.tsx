import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from './../../../store/store'
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner';

interface Props {
    adminOnly?: boolean;
    redirectPath?: string;
    allowRoles?: Array<'user' | 'admin'>;
  }
  
  export const ProtectedRoute = ({
    adminOnly = false,
    redirectPath = '/login',
    allowRoles = ['user', 'admin']
  }: Props) => {
    const location = useLocation();
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    if (isLoading) {
        return <LoadingSpinner  />;
    }
    // Если не авторизован
    if (!isAuthenticated) {
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }
  
    // Проверка ролей
    const hasRequiredRole = user?.role && (
      (adminOnly && user.role === 'admin') || 
      (!adminOnly && allowRoles.includes(user.role))
    );
  
    if (!hasRequiredRole) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return <Outlet />;
  };