import { useEffect } from 'react'
import useAuthStore from '../../Stores/Auth/UseAuthStore'
import useUserStore from '../../Stores/User/UseUserStore'

const Profile = () => {
  const { isAuthenticated, logout } = useAuthStore()
  console.log('🚀 ~ Profile ~ isAuthenticated:', isAuthenticated)
  const { getDetails, user } = useUserStore()
  useEffect(() => {
    getDetails()
  }, [isAuthenticated])

  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
