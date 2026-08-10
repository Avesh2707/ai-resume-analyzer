import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { AuthLoadingScreen } from './auth-loading-screen';

export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
