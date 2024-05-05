import { useParams } from 'react-router-dom'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import useThemeStore from '../../../Stores/Theme/UseThemeStore'
import { twMerge } from 'tailwind-merge'
import useMediaQuery from '../../../Hooks/UseMediaQuery'

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
  let paragraph = 'Here is your Username and Email Address, if you would like leave a Comment'
  if (step === ':2') {
    paragraph = 'You Have the option of monthly or yearly billing'
  } else if (step === ':3') {
    paragraph = 'Adds-ons help enhance your gaming experience'
  } else if (step === ':4') {
    paragraph = 'Double check everything looks correct before confirming'
  }

  const { theme } = useThemeStore()
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <form
      className={twMerge(isMobile && `p-5 z-30 -top-20 w-full absolute bg-${theme} rounded-xl`)}
    >
      <div className="mb-5 md:pr-10">
        <h2 className="text-[clamp(28px,4vw,35px)] leading-snug">{heading}</h2>
        <p className="opacity-80 text-xs">{paragraph}</p>
      </div>

      {step === ':1' && <FirstStep />}
      {step === ':2' && <SecondStep />}
      {step === ':3' && <ThirdStep />}
      {step === ':4' && <FourthStep />}
    </form>
  )
}

export default SubscriptionForm
