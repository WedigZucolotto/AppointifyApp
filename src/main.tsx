import ReactDOM from 'react-dom/client'
import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { GlobalContextProvider } from './hooks'
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

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/week" />} />
          <Route path="/manage" element={<Navigate to="/manage/companies" />} />
          <Route path="/manage/companies" element={<Company />} />
          <Route path="/manage/events" element={<Event />} />
          <Route path="/manage/plans" element={<Plan />} />
          <Route path="/manage/services" element={<Service />} />
          <Route path="/manage/users" element={<User />} />
          <Route path="/login" element={<p>Login</p>} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/day" element={<Day />} />
          <Route path="/week" element={<Week />} />
          <Route path="/month" element={<Month />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </LocalizationProvider>
)
