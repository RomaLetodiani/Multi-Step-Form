import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import useThemeStore from '../Stores/Theme/UseThemeStore'
import ThemeSwitcher from '../Components/ThemeSwitcher'
import { twMerge } from 'tailwind-merge'
import useMediaQuery from '../Hooks/UseMediaQuery'
import useNetworkStatus from '../Hooks/UseNetworkStatus'
import useAuthStore from '../Stores/Auth/UseAuthStore'
//
// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['bg-light', 'bg-dark', 'bg-light-container', 'bg-dark-container']

const Root = () => {
  const { theme } = useThemeStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const isOnline = useNetworkStatus()
  const { authenticationError } = useAuthStore()
  console.log('🚀 ~ Root ~ authenticationError:', authenticationError)
  console.log('🚀 ~ Root ~ isOnline:', isOnline)

  return (
    <div
      className={`bg-${theme} min-w-[375px] md:p-5 min-h-screen flex justify-center items-center`}
    >
      <div
        className={`max-w-[1000px] w-full h-screen md:min-h-0 md:h-[608px] md:shadow-sm relative md:rounded-2xl flex md:p-5 bg-${theme}-container`}
      >
        <ThemeSwitcher />
        <SideBar />
        <div
          className={twMerge(
            'absolute left-[320px] top-5 bottom-5 right-5',
            !isDesktop && 'left-5 top-[250px]',
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root
