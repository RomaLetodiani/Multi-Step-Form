import { Link, useLocation } from 'react-router-dom'
import useThemeStore from '../Theme/UseThemeStore'
import { twMerge } from 'tailwind-merge'
import useMediaQuery from '../Hooks/UseMediaQuery'
import Button from './Button'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['bg-light-primary', 'bg-dark-primary']
const SideBar = () => {
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { theme } = useThemeStore()
  return (
    <div
      className={twMerge(
        'relative z-20 smooth md:rounded-xl overflow-hidden w-[274px]',
        !isDesktop && 'w-full h-[225px]',
        pathname === '/' && 'w-full h-full',
        `bg-${theme}-primary`,
      )}
    >
      <h1
        className={twMerge(
          'text-4xl font-bold z-30 pointer-events-none uppercase flex flex-col text-center text-white leading-snug absolute smooth left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          pathname === '/' && 'text-5xl leading-normal top-[45%]',
          !isDesktop && 'top-[55%]',
        )}
      >
        <span className="font-seymour drop-shadow-2xl animate-bounce">Multi</span>
        <span className="font-seymour drop-shadow-2xl animate-bounce">Step</span>
        <span className="font-seymour drop-shadow-2xl animate-bounce">Form</span>
      </h1>
      <div
        className={twMerge(
          'smooth absolute z-30 left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2',
          !isDesktop && 'top-3/4',
        )}
      >
        <div className={`flex gap-4 ${pathname === '/' ? 'opacity-1' : 'opacity-0'}`}>
          <Link to="/login">
            <Button className="drop-shadow-xl font-bold w-32">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="drop-shadow-xl font-bold w-32">Register</Button>
          </Link>
        </div>
      </div>
      <SideBarSvg />
    </div>
  )
}

export default SideBar

const SideBarSvg = () => {
  const { pathname } = useLocation()
  const { theme } = useThemeStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const isOverLay = useMediaQuery('(min-width: 550px)')

  return (
    <div
      className={`absolute -left-24 ${
        !isDesktop ? 'scale-x-[-1] rotate-[140deg] -left-40 -top-32' : '-bottom-28'
      } overflow-hidden`}
    >
      <svg
        width="427"
        height="363"
        viewBox="0 0 427 363"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 2">
          <g id="Vector" filter="url(#filter0_ddddi_4_39)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M62.003 229.27C99.942 318.707 265.462 371.186 308.655 298.689C351.849 226.192 242.556 213.036 203.92 138.12C165.285 63.2042 135.263 16.4462 79.438 33.5132C23.614 50.5812 24.064 139.833 62.003 229.27Z"
              fill={`${theme === 'light' ? '#6259FF' : '#534BEF'}`}
            />
            <path
              d="M307.796 298.177C297.186 315.986 279.039 326.177 257.057 330.019C235.064 333.863 209.299 331.334 183.642 323.746C132.287 308.558 81.7349 273.225 62.9236 228.88C43.9921 184.251 34.4465 139.737 36.5576 104.313C38.6697 68.8712 52.4022 42.8251 79.7304 34.4695C93.5334 30.2496 105.68 29.9911 116.737 33.0859C127.801 36.1828 137.854 42.66 147.425 52.0374C166.605 70.827 183.702 101.097 203.031 138.579C212.773 157.467 226.953 172.434 242.007 185.378C249.534 191.85 257.289 197.824 264.823 203.529C266.182 204.559 267.534 205.579 268.876 206.592C274.978 211.198 280.875 215.649 286.344 220.088C299.707 230.936 310.337 241.575 315.011 253.905C319.651 266.147 318.483 280.241 307.796 298.177Z"
              stroke="white"
              strokeWidth="2"
            />
          </g>
          <g id="Vector_2" filter="url(#filter1_ddddi_4_39)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M329.79 287.322C390.469 259.044 422.629 143.796 371.665 115.794C320.7 87.7913 314.268 163.373 263.606 191.781C212.944 220.189 181.466 241.988 194.562 280.022C207.658 318.056 269.111 315.6 329.79 287.322Z"
              fill={`${theme === 'light' ? '#F9818E' : '#FF5C6E'}`}
            />
            <path
              d="M371.183 116.671C383.602 123.494 391.016 135.655 394.177 150.639C397.341 165.633 396.225 183.386 391.625 201.205C382.414 236.884 359.34 272.448 329.368 286.416C299.116 300.514 268.74 308.14 244.357 307.54C219.957 306.939 201.857 298.137 195.507 279.697C192.286 270.34 191.824 262.042 193.673 254.42C195.524 246.79 199.71 239.757 205.913 232.967C218.352 219.35 238.741 206.87 264.095 192.654C276.917 185.464 286.912 175.305 295.477 164.611C299.759 159.264 303.691 153.773 307.44 148.446C308.117 147.485 308.787 146.529 309.453 145.58C312.478 141.267 315.398 137.105 318.32 133.236C325.465 123.777 332.494 116.261 340.791 112.781C349 109.337 358.634 109.775 371.183 116.671Z"
              stroke="white"
              strokeWidth="2"
            />
          </g>
          {(isOverLay || pathname === '/') && (
            <g id="Vector_3" filter="url(#filter2_ddddi_4_39)">
              <path
                d="M233.695 130.975L244.302 120.169M277.851 136.459L265.345 125.956M255.95 150.869L249.042 165.667"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                shapeRendering="crispEdges"
              />
            </g>
          )}
          <g id="Vector_4" filter="url(#filter3_ddddi_4_39)">
            <path
              d="M97 233.06C134.003 233.06 164 203.063 164 166.06C164 129.057 134.003 99.0602 97 99.0602C59.997 99.0602 30 129.057 30 166.06C30 203.063 59.997 233.06 97 233.06Z"
              fill={`${theme === 'light' ? '#FFAF7E' : '#FF9452'}`}
            />
            <path
              d="M163 166.06C163 202.511 133.451 232.06 97 232.06C60.5493 232.06 31 202.511 31 166.06C31 129.61 60.5493 100.06 97 100.06C133.451 100.06 163 129.61 163 166.06Z"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_ddddi_4_39"
            x="5.26917"
            y="0"
            width="343.322"
            height="362.796"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.384314 0 0 0 0 0.34902 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.384314 0 0 0 0 0.34902 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect1_dropShadow_4_39" result="effect2_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect2_dropShadow_4_39" result="effect3_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.384314 0 0 0 0 0.34902 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect3_dropShadow_4_39" result="effect4_dropShadow_4_39" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect4_dropShadow_4_39"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect5_innerShadow_4_39" />
          </filter>
          <filter
            id="filter1_ddddi_4_39"
            x="161.59"
            y="79.6752"
            width="265.383"
            height="258.897"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.976471 0 0 0 0 0.505882 0 0 0 0 0.556863 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.976471 0 0 0 0 0.505882 0 0 0 0 0.556863 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect1_dropShadow_4_39" result="effect2_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect2_dropShadow_4_39" result="effect3_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.976471 0 0 0 0 0.505882 0 0 0 0 0.556863 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect3_dropShadow_4_39" result="effect4_dropShadow_4_39" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect4_dropShadow_4_39"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect5_innerShadow_4_39" />
          </filter>
          <filter
            id="filter2_ddddi_4_39"
            x="201.195"
            y="87.6693"
            width="109.156"
            height="110.499"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect1_dropShadow_4_39" result="effect2_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect2_dropShadow_4_39" result="effect3_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect3_dropShadow_4_39" result="effect4_dropShadow_4_39" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect4_dropShadow_4_39"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect5_innerShadow_4_39" />
          </filter>
          <filter
            id="filter3_ddddi_4_39"
            x="0"
            y="69.0602"
            width="194"
            height="194"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0.494118 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0.494118 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect1_dropShadow_4_39" result="effect2_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="effect2_dropShadow_4_39" result="effect3_dropShadow_4_39" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0.494118 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect3_dropShadow_4_39" result="effect4_dropShadow_4_39" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect4_dropShadow_4_39"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect5_innerShadow_4_39" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
