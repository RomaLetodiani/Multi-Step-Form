import { twMerge } from 'tailwind-merge'
import useMediaQuery from '../../Hooks/UseMediaQuery'
import Input from '../../Components/Input'
import { useInput } from '../../Hooks/UseInput'
import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import useThemeStore from '../../Theme/UseThemeStore'

const Register = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const usernameInput = useInput((value) => !!value)
  const emailInput = useInput((email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  })
  const passwordInput = useInput((password) => password.length > 8 && password.length < 20)
  const rPasswordInput = useInput((password) => password === passwordInput.value)
  const botInput = useInput((value) => !value)
  const navigate = useNavigate()
  const { theme } = useThemeStore()

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (botInput.value) {
      navigate('/botDetected')
      return
    }
    console.log('Login data:', { username: usernameInput.value })
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
        <h1 className="text-[clamp(32px,4vw,40px)] leading-snug">Create New Account</h1>
        <p className="opacity-80 text-sm leading-8">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Sign in here
          </Link>
        </p>
        <form className="flex flex-col gap-3 my-8" onSubmit={handleSubmit} action="submit">
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
    </div>
  )
}

export default Register
