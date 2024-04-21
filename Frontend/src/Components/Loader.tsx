import useThemeStore from '../Stores/Theme/UseThemeStore'

const Loader = () => {
  const { theme } = useThemeStore()
  return (
    <div className="w-40 h-40 rounded-full blur-[1px] animate-spin shadow-loader bg-loaderGradient">
      <div
        className={`absolute rounded-full blur-md w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-${theme}-container`}
      ></div>
    </div>
  )
}

export default Loader
