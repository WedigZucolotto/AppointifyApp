import { Navigate, useRoutes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { CalendarContextProvider } from './hooks'
import {
  Login,
  Schedule,
  Service,
  Success,
  User,
  Event,
  Plan,
  Day,
  Week,
  Month,
  NoPage,
  Company
} from './pages'

export const Routes = () => {
  const companyRoutes = [
    { path: ':id/users', element: <User /> },
    { path: ':id/services', element: <Service /> },
    { path: ':id/events', element: <Event /> }
  ]

  const managementRoutes = [
    { path: '', element: <Navigate to="companies" /> },
    {
      path: 'companies',
      element: <Company />,
      children: companyRoutes
    },
    { path: 'events', element: <Event /> },
    { path: 'plans', element: <Plan /> },
    { path: 'services', element: <Service /> },
    { path: 'users', element: <User /> }
  ]

  const calendarRoutes = [
    { path: ':id/day', element: <Day /> },
    { path: ':id/week', element: <Week /> },
    { path: ':id/month', element: <Month /> }
  ]

  const publicRoutes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: 'login', element: <Login /> },
    { path: ':id/schedule', element: <Schedule /> },
    { path: 'success', element: <Success /> },
    { path: '*', element: <NoPage /> }
  ]

  const privateRoutes = [
    {
      path: 'management',
      children: managementRoutes,
      element: <AuthOutlet fallbackPath="/login" />
    },
    {
      path: 'calendar',
      children: calendarRoutes,
      element: (
        <CalendarContextProvider>
          <AuthOutlet fallbackPath="/login" />
        </CalendarContextProvider>
      )
    }
  ]

  return useRoutes([...publicRoutes, ...privateRoutes])
}
