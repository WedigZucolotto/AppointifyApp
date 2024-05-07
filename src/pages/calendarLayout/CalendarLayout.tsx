import * as S from './style'
import { Header, LeftSide } from '../../components'

interface AppProps {
  children: React.ReactNode
}

export const CalendarLayout = ({ children }: AppProps) => {
  return (
    <>
      <Header />
      <S.Calendar>
        <LeftSide />
        <S.RightSide>{children}</S.RightSide>
      </S.Calendar>
    </>
  )
}
