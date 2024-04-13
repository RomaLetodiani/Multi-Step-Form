import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import useThemeStore from '../Theme/UseThemeStore'

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
const Input = ({ label, hasError, errorMessage, focus, inputClass, ...rest }: InputProps) => {
  const { theme } = useThemeStore()
  return (
    <div className="relative w-full">
      <div className="flex justify-between mb-1">
        {label && (
          <label className={`text-${theme}-text font-bold`} htmlFor={label}>
            {label}
          </label>
        )}
        {hasError && <p className="text-red-500 font-bold text-xs mt-2 mr-2">{errorMessage}</p>}
      </div>
      <input
        autoComplete="true"
        id={label}
        className={twMerge(
          `bg-${theme} text-${theme}-text`,
          'smooth w-full px-3 py-2 rounded-lg border border-gray-300 outline-none',
          inputClass,
          hasError && 'border-red-500 text-red-500',
        )}
        {...rest}
      />
    </div>
  )
}

export default Input
