import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../Stores/Auth/UseAuthStore'

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="login" replace />
}

export default PrivateRoute
