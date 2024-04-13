import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import useThemeStore from '../Theme/UseThemeStore'
import ThemeSwitcher from '../Components/ThemeSwitcher'
//
// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['bg-light', 'bg-dark', 'bg-light-container', 'bg-dark-container']

const Root = () => {
  const { theme } = useThemeStore()
  return (
    <div
      className={`bg-${theme} min-w-[375px] md:p-5 min-h-screen flex justify-center items-center`}
    >
      <div
        className={`max-w-[1000px] w-full h-screen md:h-[608px] md:shadow-sm relative md:rounded-2xl flex md:p-5 bg-${theme}-container`}
      >
        <ThemeSwitcher />
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
