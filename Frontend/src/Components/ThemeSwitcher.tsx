import { useLocation } from 'react-router-dom'
import { Moon, Sun } from '../Assets/Icons/ThemeSwitcherIcons'
import useThemeStore from '../Theme/UseThemeStore'
import { twMerge } from 'tailwind-merge'
import { useEffect } from 'react'
import useMediaQuery from '../Hooks/UseMediaQuery'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['text-light-btn', 'text-dark-btn']
const ThemeSwitcher = () => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useThemeStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    // Set the class on the body element when the component mounts
    document.body.classList.add(theme)
    if (pathname !== '/') {
      document.body.classList.remove('home')
    } else {
      document.body.classList.add('home')
    }
    return () => {
      // Clean up class on unmount
      document.body.classList.remove(theme)
    }
  }, [theme, pathname])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }
  return (
    <div
      className={twMerge(
        'text-white absolute w-8 h-8 z-50 right-4 top-4 transition-all ease-in duration-300',
        isDesktop && `text-${theme}-btn`,
        pathname === '/' && 'right-8 top-8 text-white',
      )}
    >
      <button onClick={toggleTheme}>{theme === 'light' ? Sun : Moon}</button>
    </div>
  )
}

export default ThemeSwitcher
