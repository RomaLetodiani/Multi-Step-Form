import Input from '../../../../Components/Input'
import { useInput } from '../../../../Hooks/UseInput'

const FirstStep = () => {
  const usernameInput = useInput()
  const emailInput = useInput()
  const commentInput = useInput()

  return (
    <>
      <Input label="Username" disabled={true} {...usernameInput} />
      <Input label="Email Address" disabled={true} {...emailInput} />
      <Input label="Comment (Optional)" {...commentInput} />
    </>
  )
}

export default FirstStep
