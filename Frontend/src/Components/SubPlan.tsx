import arcadeIcon from '../Assets/images/icon-arcade.svg'
import advIcon from '../Assets/images/icon-advanced.svg'
import proIcon from '../Assets/images/icon-pro.svg'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: 'Arcade' | 'Advanced' | 'Pro'
  active: boolean
  type: number
}

const SubPlan = (sub: Props) => {
  const price = sub.name === 'Arcade' ? 90 : sub.name === 'Advanced' ? 120 : 150
  return (
    <div
      className={twMerge(
        'p-4 min-h-[106px] md:min-h-[210px] border rounded-lg flex-1 flex items-center md:items-start md:flex-col gap-5 md:justify-between md:gap-10',
      )}
    >
      <div>
        <img
          src={sub.name === 'Arcade' ? arcadeIcon : sub.name === 'Advanced' ? advIcon : proIcon}
          alt={`${sub.name} Subscription type icon`}
        />
      </div>
      <div>
        <h3 className="font-bold">{sub.name}</h3>
        <p>
          {sub.type ? price : price / 10}$/{sub.type ? 'yr' : 'mo'}
        </p>
        <p>{sub.type ? '2 Months Free' : null}</p>
      </div>
    </div>
  )
}

export default SubPlan
