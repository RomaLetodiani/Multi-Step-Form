import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Additional props specific to Input component can be defined here
  label?: string
  inputClass?: string
  hasError?: boolean
  errorMessage?: string
  focus?: boolean
}

const Input = ({ label, hasError, errorMessage, focus, inputClass, ...rest }: InputProps) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          className={twMerge(
            'absolute left-3 pointer-events-none transition-all text-sm translate-x-0 -translate-y-1/2 top-1/2',
            hasError && 'text-red-500',
            focus && 'text-[10px] top-1',
          )}
          htmlFor={rest.name}
        >
          {label}
        </label>
      )}
      <input
        className={twMerge(
          'w-full rounded-lg border border-gray-300 outline-none text-sm',
          inputClass,
          hasError && 'border-warm-red text-warm-red',
        )}
        {...rest}
      />
      {hasError && <p className="absolute -bottom-10">{errorMessage}</p>}
    </div>
  )
}

export default Input
