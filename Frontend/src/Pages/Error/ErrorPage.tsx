import { Link, useLocation, useParams } from 'react-router-dom'
import Span from '../../Components/Span'
import useThemeStore from '../../Stores/Theme/UseThemeStore'
const ErrorPage = () => {
  const { errorCode } = useParams()
  const { pathname } = useLocation()
  console.log('🚀 ~ ErrorPage ~ location:', pathname)
  const { theme } = useThemeStore()
  let errorText = (
    <>
      <Span>Sorry We Could Not</Span>
      <Span>Find The Page You</Span>
      <Span>Were Looking for</Span>
    </>
  )

  pathname === '/botDetected' && (errorText = <Span>Bot Detected</Span>)

  errorCode === ':429' &&
    (errorText = (
      <>
        <Span>Too many Failed</Span>
        <Span>Requests From You</Span>
        <Span>Please Try Again Later</Span>
      </>
    ))
  return (
    <Link to={pathname === '/botDetected' ? pathname : '/'}>
      <div
        className={`absolute w-full h-full flex justify-center items-center bg-${theme}-container`}
      >
        <p className={`flex flex-col text-${theme}-text leading-snug`}>{errorText}</p>
      </div>
    </Link>
  )
}

export default ErrorPage
