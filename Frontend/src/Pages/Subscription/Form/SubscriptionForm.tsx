import { useParams } from 'react-router-dom'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'

const SubscriptionForm = () => {
  const { step } = useParams()
  let heading = 'Personal Info'
  if (step === ':2') {
    heading = 'Select your Plan'
  } else if (step === ':3') {
    heading = 'Pick adds-ons'
  } else if (step === ':4') {
    heading = 'Finishing Up'
  }
  let paragraph = 'Here is your Username and Email Address, leave a Comment if you would like'
  if (step === ':2') {
    paragraph = 'You Have the option of monthly or yearly billing'
  } else if (step === ':3') {
    paragraph = 'Adds-ons help enhance your gaming experience'
  } else if (step === ':4') {
    paragraph = 'Double check everything looks correct before confirming'
  }

  return (
    <form>
      <h1>{heading}</h1>
      <p>{paragraph}</p>

      {step === ':1' && <FirstStep />}
      {step === ':2' && <SecondStep />}
      {step === ':3' && <ThirdStep />}
      {step === ':4' && <FourthStep />}
    </form>
  )
}

export default SubscriptionForm
