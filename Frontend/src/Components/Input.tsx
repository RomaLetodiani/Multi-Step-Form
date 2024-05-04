import { InputHTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import useThemeStore from '../Stores/Theme/UseThemeStore'
import { Eye, eyeSlash } from '../Assets/Icons/eye'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Additional props specific to Input component can be defined here
  label?: string
  inputClass?: string
  hasError?: boolean
  errorMessage?: string
  focus?: boolean
}

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['text-light-text', 'text-dark-text']
const Input = ({ label, hasError, errorMessage, focus, inputClass, type, ...rest }: InputProps) => {
  const { theme } = useThemeStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(type !== 'password')
  return (
    <div className="relative w-full">
      <div className="flex justify-between mb-1">
        {label && (
          <label className={`text-${theme}-text smooth font-bold`} htmlFor={label}>
            {label}
          </label>
        )}
        {hasError && <p className="text-danger font-bold text-xs mt-2 mr-2">{errorMessage}</p>}
      </div>
      {
        <span className="relative">
          <input
            autoComplete="off"
            id={label}
            className={twMerge(
              `bg-${theme} text-${theme}-text`,
              'smooth w-full px-3 py-2 rounded-lg border border-gray-300 outline-none',
              inputClass,
              hasError && 'border-danger text-danger',
              type === 'password' && 'pr-10',
            )}
            type={isPasswordVisible ? 'text' : type}
            {...rest}
          />
          {type === 'password' && (
            <p
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className={twMerge(
                'absolute right-0 -top-[1px] -translate-y-1/4 h-10 w-10 flex justify-center cursor-pointer items-center',
                `text-${theme}-btn`,
                hasError && 'text-danger',
              )}
            >
              {isPasswordVisible ? Eye : eyeSlash}
            </p>
          )}
        </span>
      }
    </div>
  )
}

export default Input
