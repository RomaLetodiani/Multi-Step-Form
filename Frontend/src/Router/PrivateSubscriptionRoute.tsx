import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../Stores/Auth/UseAuthStore'

const PrivateSubscriptionRoute = () => {
  const user = useAuthStore((state) => state.user)
  return user?.verified ? <Outlet /> : <Navigate to="/profile" replace />
}

export default PrivateSubscriptionRoute
