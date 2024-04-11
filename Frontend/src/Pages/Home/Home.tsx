import { Link } from 'react-router-dom'
import Button from '../../Components/Button'

const Home = () => {
  return (
    <div className="absolute z-30 left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center gap-4">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
