import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import ErrorPage from '../Pages/Error/ErrorPage'
import PrivateRoute from './PrivateRoute'
import Profile from '../Pages/Profile/Profile'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Subscription from '../Pages/Subscription/Subscription'
import EmailVerification from '../Pages/Profile/Email/EmailVerification'
import SubscriptionForm from '../Pages/Subscription/Form/SubscriptionForm'
import PrivateSubscriptionRoute from './PrivateSubscriptionRoute'

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
        path: 'botDetected',
        element: <ErrorPage />,
      },
      {
        path: 'error/:errorCode',
        element: <ErrorPage />,
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
                element: <PrivateSubscriptionRoute />,
                children: [
                  {
                    path: 'subscription',
                    element: <Subscription />,
                    children: [
                      {
                        path: ':step',
                        element: <SubscriptionForm />,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'emailVerification',
                element: <EmailVerification />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default Router
