import { MouseEventHandler } from 'react'
import * as S from './style'
import { Button as MuiButton } from '@mui/material'

type ButtonType =
  | 'today'
  | 'newEvent'
  | 'schedule'
  | 'login'
  | 'noPage'
  | 'icon'
  | 'confirmation'
  | 'cancel' 

interface ButtonProps {
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  type?: ButtonType
}

export const Button = ({ children, onClick, type = 'today' }: ButtonProps) => {
  switch (type) {
    case 'today':
      return <S.TodayBtn onClick={onClick}>{children}</S.TodayBtn>
    case 'newEvent':
      return <S.NewEventBtn onClick={onClick}>{children}</S.NewEventBtn>
    case 'schedule':
      return <S.ScheduleBtn onClick={onClick}>{children}</S.ScheduleBtn>
    case 'login':
      return <S.LoginBtn onClick={onClick}>{children}</S.LoginBtn>
    case 'noPage':
      return <S.NoPage onClick={onClick}>{children}</S.NoPage>
    case 'icon':
      return (
        <MuiButton onClick={onClick} sx={S.IconBtn}>
          {children}
        </MuiButton>
      )
    case 'confirmation':
      return <S.Confirmation onClick={onClick}>{children}</S.Confirmation>
    case 'cancel':
      return <S.Cancel onClick={onClick}>{children}</S.Cancel>
  }
}
