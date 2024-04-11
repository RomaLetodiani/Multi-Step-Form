import { useLocation } from 'react-router-dom'
import useThemeStore from '../Theme/UseThemeStore'
import { twMerge } from 'tailwind-merge'

const SideBar = () => {
  const { pathname } = useLocation()
  return (
    <div className={`relative z-20 smooth ${pathname === '/' ? 'w-full' : 'w-[274px]'} `}>
      <h1
        className={twMerge(
          'text-5xl flex flex-col text-center text-white leading-snug absolute smooth left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          pathname === '/' && 'top-1/3',
        )}
      >
        <span>Multi</span>
        <span>Step</span>
        <span>Form</span>
      </h1>
      <SideBarSvg />
    </div>
  )
}

export default SideBar

const SideBarSvg = () => {
  const { theme } = useThemeStore()

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="568" fill="none">
      <rect
        width="100%"
        height="568"
        fill={`${theme === 'light' ? '#483EFF' : '#15124C'}`}
        rx="15"
      />
      <mask id="a" width="100%" height="568" x="0" y="0" maskUnits="userSpaceOnUse">
        <rect width="100%" height="568" fill="#fff" rx="15" />
      </mask>
      <g mask="url(#a)">
        <path
          fill={`${theme === 'light' ? '#6259FF' : '#312d77'}`}
          fillRule="evenodd"
          d="M-34.692 543.101C3.247 632.538 168.767 685.017 211.96 612.52c43.194-72.497-66.099-85.653-104.735-160.569-38.635-74.916-68.657-121.674-124.482-104.607-55.824 17.068-55.375 106.32-17.436 195.757Z"
          clipRule="evenodd"
        />
        <path
          fill={`${theme === 'light' ? '#F9818E' : '#8f3942'}`}
          fillRule="evenodd"
          d="M200.095 601.153c60.679-28.278 92.839-143.526 41.875-171.528-50.965-28.003-57.397 47.579-108.059 75.987-50.662 28.408-82.14 50.207-69.044 88.241 13.096 38.034 74.549 35.578 135.228 7.3Z"
          clipRule="evenodd"
        />
        <path
          stroke={`${theme === 'light' ? '#FFF' : '#b3b3b3'}`}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeWidth="5"
          d="m135.305 469.097 10.607-10.806M180.461 474.581l-12.506-10.503M150.56 480.991l-6.908 14.798"
        />
        <path
          fill={`${theme === 'light' ? '#FFAF7E' : '#975227'}`}
          d="M.305 546.891c37.003 0 67-29.997 67-67s-29.997-67-67-67-67 29.997-67 67 29.997 67 67 67Z"
        />
      </g>
    </svg>
  )
}
