import * as S from './style'

type ButtonType = 'today' | 'newEvent' | 'schedule' | 'login' | 'noPage'

interface ButtonProps {
  type?: ButtonType
  children: React.ReactNode
  onClick: () => void
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
      return <S.loginBtn onClick={onClick}>{children}</S.loginBtn>
    case 'noPage':
      return <S.NoPage onClick={onClick}>{children}</S.NoPage>
  }
}