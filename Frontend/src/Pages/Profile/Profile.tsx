import { useState } from 'react'
import useAuthStore from '../../Stores/Auth/UseAuthStore'
import Loader from '../../Components/Loader'
import Button from '../../Components/Button'
import Popover from '../../Components/Popover'
import { Link, useNavigate } from 'react-router-dom'
import { UserServices } from '../../Services/User'
import useClipboard from '../../Hooks/useClipBoard'
import { Copy } from '../../Assets/Icons/Copy'

const Profile = () => {
  const [copyToClipboard, isCopied] = useClipboard()
  const { loading, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [emailVerificationError, setEmailVerificationError] = useState(false)

  const handleEmailVerification = async () => {
    await UserServices.sendEmailVerification()
      .then((response) => {
        if (response.status === 200) {
          setEmailVerificationError(false)
          navigate('/profile/emailVerification')
        }
      })
      .catch(() => setEmailVerificationError(true))
  }

  return loading ? (
    <div className="absolute w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="absolute w-full h-full">
      <Popover position="bottom-right" content={<p>{user?.username}</p>}>
        <h1 className="text-[clamp(32px,4vw,40px)] w-max md:pr-10 leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
          Welcome {user?.username}
        </h1>
      </Popover>
      <p className="opacity-80 text-sm leading-10">What Are You Up to Today?</p>
      <Link to={'subscription'}>
        <Button className="my-5">See Your Subscriptions Here</Button>
      </Link>
      {user?.email && (
        <div>
          <p className="opacity-80 leading-6">Your {user?.verified && 'Verified'} Email:</p>
          <div className="flex gap-2 flex-wrap">
            <Popover
              position={user.email.length > 30 ? 'top-left' : undefined}
              content={<p>{user?.email}</p>}
            >
              <Button className="cursor-default font-bold opacity-100 hover:opacity-100">
                {user.email.length > 30 ? `${user?.email.slice(0, 30)}...` : user?.email}
              </Button>
            </Popover>
            {user?.verified && (
              <Button onClick={() => copyToClipboard(user.email)} className="w-[100px] font-bold">
                {isCopied ? (
                  'Copied'
                ) : (
                  <div className="flex items-center gap-1">
                    <span>{Copy}</span> Copy
                  </div>
                )}
              </Button>
            )}
            {!user?.verified && (
              <Button onClick={handleEmailVerification} className={`font-bold py-2 px-5`}>
                Verify
              </Button>
            )}
          </div>
          {emailVerificationError && (
            <p className="text-danger">Error while Sending Verification Email</p>
          )}
        </div>
      )}
      <Button className="absolute right-28 bottom-0">Edit</Button>

      <Button className="absolute right-0 bottom-0 bg-danger hover:bg-danger/90" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export default Profile
