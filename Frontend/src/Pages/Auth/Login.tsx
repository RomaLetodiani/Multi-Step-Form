import { twMerge } from 'tailwind-merge'
import useMediaQuery from '../../Hooks/UseMediaQuery'
import Input from '../../Components/Input'
import { useInput } from '../../Hooks/UseInput'
import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import useThemeStore from '../../Theme/UseThemeStore'
import AuthServices from '../../Services/Auth'

// Tailwind has to have the classes imported for dynamic use
// @ts-ignore for the warning: "'tailwindClasses' is declared but its value is never read.ts(6133)"
const tailwindClasses = ['text-light-text', 'text-dark-text']

const Login = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const usernameInput = useInput((value) => !!value)
  const passwordInput = useInput((value) => !!value)
  const botInput = useInput((value) => !value)
  const navigate = useNavigate()
  const { theme } = useThemeStore()

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (botInput.value) {
      navigate('/botDetected')
      return
    }

    await AuthServices.login({
      username: usernameInput.value,
      password: passwordInput.value,
    }).then((res) => console.log(res))

    // Simulate login success
  }

  return (
    <div
      className={twMerge(
        'absolute left-[320px] top-5 bottom-5 right-5',
        !isDesktop && 'left-5 top-[250px]',
      )}
    >
      <div className={`max-w-md m-auto text-${theme}-text`}>
        <h1 className="text-[clamp(32px,4vw,40px)] leading-snug">Log in to your account</h1>
        <p className="opacity-80 text-sm leading-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        <form className="flex flex-col gap-5 my-10" onSubmit={handleSubmit} action="submit">
          <Input label="Username" errorMessage={'This Field is Required'} {...usernameInput} />
          <Input label="Password" errorMessage={'This Field is Required'} {...passwordInput} />
          <div className="absolute opacity-0 pointer-events-none">
            <Input label="Trap" errorMessage={'Trapped you'} {...botInput} />
          </div>
          <Button className="font-bold text-lg mt-5 w-full">Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
