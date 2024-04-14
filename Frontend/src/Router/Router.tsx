import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import ErrorPage from '../Pages/Error/ErrorPage'
import PrivateRoute from './PrivateRoute'
import Profile from '../Pages/Profile/Profile'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Subscription from '../Pages/Subscription/Subscription'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'profile',
            children: [
              {
                path: '',
                element: <Profile />,
              },
              {
                path: 'subscription',
                element: <Subscription />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default Router
