import { Navigate, useRoutes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { CalendarContextProvider } from './hooks'
import {
  Login,
  Schedule,
  Success,
  User,
  Day,
  Week,
  Month,
  NoPage,
  Services,
  Company
} from './pages'

export const Routes = () => {
  const calendarRoutes = [
    { path: ':userId/day', element: <Day /> },
    { path: ':userId/week', element: <Week /> },
    { path: ':userId/month', element: <Month /> },
    { path: ':userId/user', element: <User /> },
    { path: ':companyId/services', element: <Services /> },
    { path: ':companyId/company', element: <Company /> }
  ]

  const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: 'login', element: <Login /> },
    { path: ':companyId/schedule', element: <Schedule /> },
    { path: 'success', element: <Success /> },
    {
      path: 'calendar',
      children: calendarRoutes,
      element: (
        <CalendarContextProvider>
          <AuthOutlet fallbackPath="/login" />
        </CalendarContextProvider>
      )
    },
    { path: '*', element: <NoPage /> }
  ]

  return useRoutes(routes)
}
