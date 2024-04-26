import ReactDOM from 'react-dom/client'
import './index.css'
import { Snackbar } from './components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { GlobalContextProvider, SnackbarContextProvider } from './hooks'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'
import {
  Company,
  Day,
  Month,
  Plan,
  Service,
  User,
  Week,
  Event,
  Schedule,
  Login,
  NoPage
} from './pages'

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

const store = createStore<{}>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
})

const PublicRoutes = () => (
  <Routes>
    <Route path="*" element={<NoPage />} />
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/:id/schedule" element={<Schedule />} />
  </Routes>
)

const PrivateRoutes = () => (
  <Routes>
    <Route element={<AuthOutlet fallbackPath="/login" />}>
      <Route
        path="/management"
        element={<Navigate to="/management/companies" />}
      />
      <Route path="/management/companies" element={<Company />} />
      <Route path="/management/companies/:id/users" element={<User />} />
      <Route path="/management/companies/:id/services" element={<Service />} />
      <Route path="/management/companies/:id/events" element={<Event />} />
      <Route path="/management/events" element={<Event />} />
      <Route path="/management/plans" element={<Plan />} />
      <Route path="/management/services" element={<Service />} />
      <Route path="/management/users" element={<User />} />
      <Route path="/day" element={<Day />} />
      <Route path="/week" element={<Week />} />
      <Route path="/month" element={<Month />} />
    </Route>
  </Routes>
)

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthProvider store={store}>
      <SnackbarContextProvider>
        <GlobalContextProvider>
          <BrowserRouter>
            <PublicRoutes />
            <PrivateRoutes />
          </BrowserRouter>
        </GlobalContextProvider>
        <Snackbar />
      </SnackbarContextProvider>
    </AuthProvider>
  </LocalizationProvider>
)
