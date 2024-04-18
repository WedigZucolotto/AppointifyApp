import { useSnackbarContext } from '../../hooks'
import { Alert, Snackbar as MuiSnackbar } from '@mui/material'

export const Snackbar = () => {
  const { snackbar } = useSnackbarContext()

  return (
    <MuiSnackbar open={snackbar.open}>
      <Alert severity={snackbar.type} variant="filled" sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  )
}
