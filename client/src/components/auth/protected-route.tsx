import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { AuthLoadingScreen } from './auth-loading-screen';

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
