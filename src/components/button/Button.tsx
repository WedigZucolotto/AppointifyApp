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

interface ButtonProps {
  type?: ButtonType
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ type = 'today', children, onClick }: ButtonProps) => {
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
  }
}
