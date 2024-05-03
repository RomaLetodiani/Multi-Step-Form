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
  }

  if (step === ':1') {
    NextText = 'Next'
    linkTo = ':2'
  } else if (step === ':2') {
    NextText = 'Next'
    linkTo = ':3'
  } else if (step === ':3') {
    NextText = 'Confirm'
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

      {step && (
        <Button onClick={() => navigate(-1)} className="absolute bottom-0 left-0">
          Prev
        </Button>
      )}
      <Link to={linkTo}>
        <Button className="absolute bottom-0 right-0">{NextText}</Button>
      </Link>
    </div>
  )
}

export default Subscription
