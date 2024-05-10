import { twMerge } from 'tailwind-merge'
import useThemeStore from '../Stores/Theme/UseThemeStore'
import { advanced, arcade, pro } from '../Assets/images'

type Props = {
  name: 'Arcade' | 'Advanced' | 'Pro'
  active: boolean
  type: number
  onClick: () => void
}

const SubPlan = (sub: Props) => {
  const { theme } = useThemeStore()
  const price = sub.name === 'Arcade' ? 90 : sub.name === 'Advanced' ? 120 : 150
  return (
    <div
      onClick={sub.onClick}
      className={twMerge(
        'p-4 cursor-pointer min-h-[106px] md:min-h-[210px] border rounded-lg md:hover:scale-110 hover:scale-105 transition-all duration-300 flex-1 flex items-center md:items-start md:flex-col gap-5 md:justify-between md:gap-10',
        `${sub.active && `bg-${theme}-btn text-white`}`,
      )}
    >
      <div>
        <img
          className="drop-shadow-sm hover:scale-110 transition-transform duration-300"
          src={sub.name === 'Arcade' ? arcade : sub.name === 'Advanced' ? advanced : pro}
          alt={`${sub.name} Subscription type icon`}
        />
      </div>
      <div className="transition-none">
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
