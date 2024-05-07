import ReactDOM from 'react-dom/client'
import './index.css'
import { Snackbar } from './components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarContextProvider } from './hooks'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'
import { Routes } from './routes'

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

const store = createStore<{}>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
})

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthProvider store={store}>
      <SnackbarContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Snackbar />
      </SnackbarContextProvider>
    </AuthProvider>
  </LocalizationProvider>
)
