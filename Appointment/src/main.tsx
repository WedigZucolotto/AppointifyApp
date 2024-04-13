import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './pages/Home'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Home />
  </LocalizationProvider>
)
