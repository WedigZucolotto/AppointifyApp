import ErrorIcon from '@mui/icons-material/Error'
import * as S from './style'
import { Visible } from '../..'

interface InputErrorProps {
  message?: string
}

export const InputError = ({ message }: InputErrorProps) => {
  return (
    <Visible when={!!message}>
      <S.InputErrorBox>
        <ErrorIcon fontSize="inherit" color="error" />
        <span className="message">{message}</span>
      </S.InputErrorBox>
    </Visible>
  )
}
