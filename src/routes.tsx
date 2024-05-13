import { Navigate, Outlet, useRoutes } from 'react-router-dom'
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
  CompanyManagement,
  Services,
  Company
} from './pages'

export const Routes = () => {
  const userRoutes = [
    { path: '', element: <User /> },
    { path: ':userId/events', element: <Event /> }
  ]

  const companyRoutes = [
    { path: '', element: <CompanyManagement /> },
    { path: ':companyId/users', element: <Outlet />, children: userRoutes },
    { path: ':companyId/services', element: <Service /> },
    { path: ':companyId/events', element: <Event /> }
  ]

  const managementRoutes = [
    { path: '', element: <Navigate to="companies" /> },
    { path: 'plans', element: <Plan /> },
    {
      path: 'companies',
      element: <Outlet />,
      children: companyRoutes
    }
  ]

  const calendarRoutes = [
    { path: ':userId/day', element: <Day /> },
    { path: ':userId/week', element: <Week /> },
    { path: ':userId/month', element: <Month /> },
    { path: ':userId/services', element: <Services /> },
    { path: ':userId/user', element: <User /> },
    { path: ':userId/company', element: <Company /> }
  ]

  const publicRoutes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: 'login', element: <Login /> },
    { path: ':companyId/schedule', element: <Schedule /> },
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
