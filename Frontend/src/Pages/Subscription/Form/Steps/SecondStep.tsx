import SubPlan from '../../../../Components/SubPlan'
import ToggleButton from '../../../../Components/ToggleButton'
import { plans } from '../../../../Shared/Const'
import useSubStore from '../../../../Stores/Subscription/UseSubStore'

const SecondStep = () => {
  const { subscriptionName, subscriptionType, setSubscriptionType } = useSubStore()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        {plans.map((plan) => (
          <SubPlan
            key={plan.id}
            active={subscriptionName === plan.name}
            type={subscriptionType}
            name={plan.name}
          />
        ))}
      </div>
      <ToggleButton
        value={subscriptionType}
        onClick={() => setSubscriptionType(subscriptionType ? 0 : 1)}
      />
    </div>
  )
}

export default SecondStep
