import arcadeIcon from '../Assets/images/icon-arcade.svg'
import advIcon from '../Assets/images/icon-advanced.svg'
import proIcon from '../Assets/images/icon-pro.svg'

type Props = {
  name: 'arcade' | 'advanced' | 'pro'
  active: boolean
  type: boolean
}

const SubPlan = (sub: Props) => {
  const price = sub.name === 'arcade' ? 90 : sub.name === 'advanced' ? 120 : 150
  return (
    <div>
      <img
        src={sub.name === 'arcade' ? arcadeIcon : sub.name === 'advanced' ? advIcon : proIcon}
        alt={`${sub.name} Subscription type icon`}
      />
      <div>
        <h3 className="font-bold">{sub.name}</h3>
        <p>
          {sub.type ? price : price / 10}/{sub.type ? 'yr' : 'mo'}
        </p>
        <p>{sub.type && '2 Months Free'}</p>
      </div>
    </div>
  )
}

export default SubPlan
