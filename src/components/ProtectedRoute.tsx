import { ReactNode } from 'react';
import { Navigate, useLocation,Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: ReactNode;
}

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth);
//   const location = useLocation();  
//   if (!isAuthenticated || !accessToken) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   } 
//   return <>{children}</>;
// }
// ProtectedLayout.tsx 

export default function ProtectedLayout() {
  const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Renders child routes if authenticated
}
