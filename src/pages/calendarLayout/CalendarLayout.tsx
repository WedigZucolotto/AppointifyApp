import * as S from './style'
import { Header, LeftSide } from '../../components'
import { CalendarType } from '../../hooks'

interface CalendarLayoutProps {
  children: React.ReactNode
  type?: CalendarType
}

export const CalendarLayout = ({
  children,
  type = 'week'
}: CalendarLayoutProps) => {
  return (
    <>
      <Header />
      <S.Calendar>
        <LeftSide />
        <S.RightSide type={type}>{children}</S.RightSide>
      </S.Calendar>
    </>
  )
}
