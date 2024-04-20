import Input from '../../Components/Input'
import { useInput } from '../../Hooks/UseInput'
import { FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import useThemeStore from '../../Stores/Theme/UseThemeStore'
import useAuthStore from '../../Stores/Auth/UseAuthStore'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['text-light-text', 'text-dark-text', 'text-light-btn', 'text-dark-btn']

const Login = () => {
  const usernameInput = useInput((value) => !!value)
  const passwordInput = useInput((value) => !!value)
  const botInput = useInput((value) => !value)
  const navigate = useNavigate()
  const { theme } = useThemeStore()
  const { login, isAuthenticated } = useAuthStore()

  useEffect(() => {
    isAuthenticated && navigate('/')
  }, [isAuthenticated])

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (botInput.value) {
      navigate('/botDetected')
      return
    }
    await login(usernameInput.value, passwordInput.value)
  }

  return (
    !isAuthenticated && (
      <div className={`max-w-md m-auto text-${theme}-text`}>
        <h1 className="text-[clamp(32px,4vw,40px)] leading-snug">Log in to your account</h1>
        <p className="opacity-80 text-sm leading-8">
          Don't have an account?{' '}
          <Link to="/register" className={`text-${theme}-btn font-bold`}>
            Sign Up
          </Link>
        </p>
        <form className="flex flex-col gap-5 my-8" onSubmit={handleSubmit} action="submit">
          <Input label="Username" errorMessage={'This Field is Required'} {...usernameInput} />
          <Input label="Password" errorMessage={'This Field is Required'} {...passwordInput} />
          <div className="absolute opacity-0 pointer-events-none">
            <Input label="Trap" errorMessage={'Trapped you'} {...botInput} />
          </div>
          <Button className="font-bold text-lg mt-5 w-full">Login</Button>
        </form>
      </div>
    )
  )
}

export default Login
