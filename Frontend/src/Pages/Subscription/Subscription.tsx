import { useEffect } from 'react'
import { UserServices } from '../../Services/User'

const Subscription = () => {
  useEffect(() => {
    UserServices.getDetails().then((details) => {
      console.log('🚀 ~ UserServices.getDetails ~ details:', details)
    })
  }, [])
  return <div>Subscription</div>
}

export default Subscription
