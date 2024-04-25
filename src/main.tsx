import ReactDOM from 'react-dom/client'
import './index.css'
import { Snackbar } from './components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { GlobalContextProvider, SnackbarContextProvider } from './hooks'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  Company,
  Day,
  Month,
  Plan,
  Service,
  User,
  Week,
  Event,
  Schedule
} from './pages'
import { Login } from './pages/login/Login'

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <SnackbarContextProvider>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/schedule" />} />
            <Route
              path="/management"
              element={<Navigate to="/management/companies" />}
            />
            <Route path="/management/companies" element={<Company />} />
            <Route path="/management/companies/:id/users" element={<User />} />
            <Route
              path="/management/companies/:companyId/services"
              element={<Service />}
            />
            <Route
              path="/management/companies/:id/events"
              element={<Event />}
            />
            <Route path="/management/events" element={<Event />} />
            <Route path="/management/plans" element={<Plan />} />
            <Route path="/management/services" element={<Service />} />
            <Route path="/management/users" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/day" element={<Day />} />
            <Route path="/week" element={<Week />} />
            <Route path="/month" element={<Month />} />
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
      <Snackbar />
    </SnackbarContextProvider>
  </LocalizationProvider>
)
