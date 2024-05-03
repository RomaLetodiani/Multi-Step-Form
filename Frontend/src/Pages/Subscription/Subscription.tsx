import { useEffect } from 'react'
import useAuthStore from '../../Stores/Auth/UseAuthStore'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Button from '../../Components/Button'

const Subscription = () => {
  const user = useAuthStore((state) => state.user)
  const { step } = useParams()
  const subscription = user?.subscription
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/profile')
    }
  }, [user])

  let NextText = 'Click Here To Subscribe'
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
          <h1 className="flex justify-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold">
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
    <div>
      {renderSubscriptionInfo()}
      {step && <Outlet />}

      <Button onClick={() => navigate(-1)} className="absolute bottom-0 left-0 z-50">
        Back
      </Button>
      <Link to={linkTo}>
        <Button className="absolute bottom-0 right-0">{NextText}</Button>
      </Link>
    </div>
  )
}

export default Subscription
