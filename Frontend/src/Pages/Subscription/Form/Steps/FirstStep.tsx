import Input from '../../../../Components/Input'
import { useInput } from '../../../../Hooks/UseInput'
import useAuthStore from '../../../../Stores/Auth/UseAuthStore'

const FirstStep = () => {
  const { user } = useAuthStore()
  const commentInput = useInput()

  return (
    <>
      <Input
        inputClass="cursor-not-allowed"
        label="Username"
        disabled={true}
        value={user?.username}
      />
      <div className="my-5">
        <Input
          inputClass="cursor-not-allowed"
          label="Email Address"
          disabled={true}
          value={user?.email}
        />
      </div>
      <Input label="Comment (Optional)" {...commentInput} />
    </>
  )
}

export default FirstStep
