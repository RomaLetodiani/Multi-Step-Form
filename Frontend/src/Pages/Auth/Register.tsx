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

const Register = () => {
  const usernameInput = useInput((value) => !!value)
  const emailInput = useInput((email) => {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(email)
  })
  const passwordInput = useInput((password) => password.length > 8 && password.length < 20)
  const rPasswordInput = useInput((password) => password === passwordInput.value)
  const botInput = useInput((value) => !value)
  const navigate = useNavigate()
  const { theme } = useThemeStore()
  const { register, isAuthenticated } = useAuthStore()

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
    await register(usernameInput.value, emailInput.value, passwordInput.value)
  }

  return (
    !isAuthenticated && (
      <div className={`max-w-md m-auto text-${theme}-text`}>
        <h1 className="text-[clamp(32px,4vw,40px)] leading-snug">Create New Account</h1>
        <p className="opacity-80 text-sm leading-8">
          Already have an account?{' '}
          <Link to="/login" className={`text-${theme}-btn font-bold`}>
            Sign in here
          </Link>
        </p>
        <form className="flex flex-col gap-3 my-8 pb-10" onSubmit={handleSubmit} action="submit">
          <Input label="Username" errorMessage={'This Field is Required'} {...usernameInput} />
          <Input label="Email" errorMessage={'This Field is Required'} {...emailInput} />
          <Input label="Password" errorMessage={'This Field is Required'} {...passwordInput} />
          <Input
            disabled={!passwordInput.value || passwordInput.hasError}
            label="Repeat Password"
            errorMessage={'This Field is Required'}
            {...rPasswordInput}
          />
          <div className="absolute opacity-0 pointer-events-none">
            <Input label="Trap" errorMessage={'Trapped you'} {...botInput} />
          </div>
          <Button className="font-bold text-lg mt-5 w-full">Register</Button>
        </form>
      </div>
    )
  )
}

export default Register
