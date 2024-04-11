import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import useThemeStore from '../Theme/UseThemeStore'
import ThemeSwitcher from '../Components/ThemeSwitcher'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = [
  'bg-light',
  'bg-dark',
  'bg-light-container',
  'bg-dark-container',
  'shadow-lights',
  'shadow-darks',
]

const Root = () => {
  const { theme } = useThemeStore()
  return (
    <div className={`bg-${theme} min-w-[320px] p-5 min-h-screen flex justify-center items-center`}>
      <div
        className={`max-w-[1000px] shadow-${theme}s relative rounded-2xl flex w-full p-5 bg-${theme}-container`}
      >
        <ThemeSwitcher />
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
