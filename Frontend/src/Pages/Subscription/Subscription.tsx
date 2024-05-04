import { useEffect } from 'react'
import useAuthStore from '../../Stores/Auth/UseAuthStore'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Button from '../../Components/Button'
import { SubscribeServices } from '../../Services/Subscribe'
import { twMerge } from 'tailwind-merge'
import useThemeStore from '../../Stores/Theme/UseThemeStore'

const Subscription = () => {
  const { user, getDetails } = useAuthStore()
  const { step } = useParams()
  const { theme } = useThemeStore()
  const subscription = user?.subscription
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/profile')
    }
  }, [user])

  let NextText = 'Subscribe'
  let linkTo = ':1'

  if (subscription?.active) {
    NextText = 'Unsubscribe'
    linkTo = ''
  } else if (step === ':1') {
    NextText = 'Next'
    linkTo = ':2'
  } else if (step === ':2') {
    NextText = 'Next'
    linkTo = ':3'
  } else if (step === ':3') {
    NextText = 'Next'
    linkTo = ':4'
  } else if (step === ':4') {
    NextText = 'Confirm'
    linkTo = '/profile'
  }

  const renderSubscriptionInfo = () => {
    if (!subscription && !step) {
      return (
        <>
          <h1 className="min-w-60 flex justify-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold">
            <span>You Don't Have any</span>
            <span>Subscriptions Yet</span>
          </h1>
        </>
      )
    } else if (subscription && !step) {
      return (
        <>
          <h1>Your {!subscription.active && 'Last'} Subscription</h1>
          <p>Start Date: {moment(subscription.createdAt).format('YY.MM.DD')}</p>
          <p>Expire Date: {moment(subscription.expiresAt).format('YY.MM.DD')}</p>
          <p>Plan: {subscription.type ? 'Yearly' : 'Monthly'}</p>
        </>
      )
    }
  }

  return (
    <div className="max-w-lg m-auto relative h-full">
      {renderSubscriptionInfo()}
      {step && <Outlet />}

      <Button
        onClick={() => navigate(-1)}
        className={twMerge(
          'absolute bottom-0 px-0 left-0 z-50 opacity-70 bg-transparent shadow-none font-bold',
          `text-${theme}-text`,
          `hover:opacity-100`,
        )}
      >
        Go Back
      </Button>
      <Link to={linkTo}>
        <Button
          onClick={() => {
            subscription?.active && SubscribeServices.unsubscribe().then(() => getDetails())
          }}
          className={twMerge('absolute bottom-0 right-0', subscription?.active && 'bg-red-500')}
        >
          {NextText}
        </Button>
      </Link>
    </div>
  )
}

export default Subscription
