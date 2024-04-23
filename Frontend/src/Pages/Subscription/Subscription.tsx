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
  let buttonText = 'Click Here To Subscribe'
  let linkTo = ':1'

  if (subscription?.active) {
    buttonText = 'Unsubscribe'
    linkTo = ''
  }

  if (step === ':1') {
    buttonText = 'Next'
    linkTo = ':2'
  } else if (step === ':2') {
    buttonText = 'Next'
    linkTo = ':3'
  } else if (step === ':3') {
    buttonText = 'Confirm'
    linkTo = '/profile'
  }

  return (
    <div>
      {!subscription && !step && (
        <>
          <h1>You Don't Have any Subscriptions Yet</h1>
        </>
      )}
      {subscription && !step && (
        <>
          <h1>Your {!subscription.active && 'Last'} Subscription</h1>
          <p>Start Date: {moment(subscription.createdAt).format('YY.MM.DD')}</p>
          <p>Expire Date: {moment(subscription.expiresAt).format('YY.MM.DD')}</p>
          <p>Plan: {subscription.type ? 'Yearly' : 'Monthly'}</p>
        </>
      )}
      {step && <Outlet />}

      <Link to={linkTo}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  )
}

export default Subscription
