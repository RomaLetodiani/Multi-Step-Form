import Input from '../../../../Components/Input'
import { useInput } from '../../../../Hooks/UseInput'
import useAuthStore from '../../../../Stores/Auth/UseAuthStore'

const FirstStep = () => {
  const { user } = useAuthStore()
  const usernameInput = useInput(() => true, user?.username)
  const emailInput = useInput(() => true, user?.email)
  const commentInput = useInput()

  return (
    <>
      <Input label="Username" disabled={true} {...usernameInput} />
      <div className="my-5">
        <Input label="Email Address" disabled={true} {...emailInput} />
      </div>
      <Input label="Comment (Optional)" {...commentInput} />
    </>
  )
}

export default FirstStep
