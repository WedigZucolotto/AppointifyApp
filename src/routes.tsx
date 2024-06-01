import { Navigate, useRoutes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import {
  CalendarContextProvider,
  LoginResponse,
  useLocalStorage,
  useWindowWidth
} from './hooks'
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
  const user = useAuthUser<LoginResponse>()
  const { isDesktop } = useWindowWidth()
  const { verifyStorage } = useLocalStorage()

  const calendarRoutes = [
    { path: ':userId/day', element: <Day /> },
    {
      path: ':userId/week',
      element: isDesktop ? (
        <Week />
      ) : (
        <Navigate to={`/calendar/${user?.id}/day`} />
      )
    },
    {
      path: ':userId/month',
      element: isDesktop ? (
        <Month />
      ) : (
        <Navigate to={`/calendar/${user?.id}/day`} />
      )
    },
    { path: ':companyId/services', element: <Services /> },
    { path: ':userId/user', element: <User /> },
    { path: ':companyId/company', element: <Company /> }
  ]

  const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    {
      path: 'login',
      element: user ? <Navigate to={`/calendar/${user?.id}/day`} /> : <Login />
    },
    {
      path: ':companyId/schedule',
      element: verifyStorage("scheduled") ? <Navigate to="/success" /> : <Schedule />
    },
    {
      path: 'success',
      element: verifyStorage("scheduled") ? <Success /> : <Navigate to="/404" />
    },
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
