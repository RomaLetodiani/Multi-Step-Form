import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge(
        'cursor-pointer py-2 px-5 sm:px-12 rounded-full bg-slate-500 shadow-lg text-white hover:opacity-70',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
