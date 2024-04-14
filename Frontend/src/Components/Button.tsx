import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import useThemeStore from '../Stores/Theme/UseThemeStore'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}
// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['bg-light-btn', 'bg-dark-btn']

const Button = ({ children, className, ...rest }: Props) => {
  const { theme } = useThemeStore()
  return (
    <button
      {...rest}
      className={twMerge(
        'cursor-pointer rounded-lg px-5 py-2 bg-slate-500 shadow-lg text-white hover:opacity-90',
        `bg-${theme}-btn`,
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
