import React from 'react'
import { twMerge } from 'tailwind-merge'
import useThemeStore from '../Stores/Theme/UseThemeStore'

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
}

const Popover = ({ children, content, position }: PopoverProps) => {
  const { theme } = useThemeStore()

  return (
    <div className="relative w-max group">
      {children}
      {
        <div
          className={twMerge(
            'invisible group-hover:visible absolute opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out',
            `text-${theme}-text bg-${theme} border border-${theme}-text p-2 rounded-md shadow-md z-50`,
            !position && 'hidden',
            getPositionClasses(position),
          )}
        >
          {content}
        </div>
      }
    </div>
  )
}

const getPositionClasses = (position?: PopoverProps['position']) => {
  switch (position) {
    case 'top':
      return 'absolute bottom-full left-1/2 translate-x-[-50%] z-10'
    case 'bottom':
      return 'absolute top-full left-1/2 translate-x-[-50%] z-10'
    case 'left':
      return 'absolute top-1/2 right-full translate-y-[-50%] z-10'
    case 'right':
      return 'absolute top-1/2 left-full translate-y-[-50%] z-10'
    case 'bottom-left':
      return 'absolute top-full left-0 z-10'
    case 'bottom-right':
      return 'absolute top-full right-0 z-10'
    case 'top-left':
      return 'absolute bottom-full left-0 z-10'
    case 'top-right':
      return 'absolute bottom-full right-0 z-10'
    default:
      return ''
  }
}

export default Popover
