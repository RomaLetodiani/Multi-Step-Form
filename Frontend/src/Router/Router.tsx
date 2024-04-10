import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import ErrorPage from '../Pages/Error/ErrorPage'
import Home from '../Pages/Home/Home'
import PrivateRoute from './PrivateRoute'
import Profile from '../Pages/Profile/Profile'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])

export default Router
