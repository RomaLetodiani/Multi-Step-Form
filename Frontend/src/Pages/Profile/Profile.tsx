import { useEffect } from 'react'
import useAuthStore from '../../Stores/Auth/UseAuthStore'
import useUserStore from '../../Stores/User/UseUserStore'

const Profile = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const { getDetails, user } = useUserStore()
  console.log('🚀 ~ Profile ~ user:', user)

  useEffect(() => {
    isAuthenticated && getDetails()
  }, [isAuthenticated])

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Username:</p>
        <p>{user?.username}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Subscription:</p>
        {user?.subscription && (
          <div>
            <p>Active: {user.subscription.active ? 'Yes' : 'No'}</p>
            <p>Expires At: {new Date(user.subscription.expiresAt).toLocaleDateString()}</p>
            <p>Monthly Price: ${user.subscription.monthlyPrice}</p>
            <p>Name: {user.subscription.name}</p>
            <p>Type: {user.subscription.type}</p>
            {user.subscription.addOns && user.subscription.addOns.length > 0 && (
              <div>
                <p className="font-semibold">Add-ons:</p>
                <ul>
                  {user.subscription.addOns.map((addOn, index) => (
                    <li key={index}>
                      <p>
                        {addOn.name} - ${addOn.price} - {addOn.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile
