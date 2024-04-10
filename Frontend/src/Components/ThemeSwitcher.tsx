import { useLocation } from 'react-router-dom'
import { Moon, Sun } from '../Assets/Icons/ThemeSwitcherIcons'
import useThemeStore from '../Theme/UseThemeStore'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = [
  'text-light-container',
  'text-dark-container',
  'text-light-text',
  'text-dark-text',
]
const ThemeSwitcher = () => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useThemeStore()
  return (
    <div
      className={`absolute z-50 ${
        pathname === '/' ? `right-8 top-8 text-white` : `right-4 top-4 text-${theme}-text`
      } transition-all ease-in duration-300`}
    >
      {theme === 'light' && <button onClick={() => setTheme('dark')}>{Sun}</button>}
      {theme === 'dark' && <button onClick={() => setTheme('light')}>{Moon}</button>}
    </div>
  )
}

export default ThemeSwitcher
