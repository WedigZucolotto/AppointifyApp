import * as S from './style'
import { Header, LeftSide } from '../../components'

interface AppProps {
  children: React.ReactNode
}

export const Layout = ({ children }: AppProps) => {
  return (
    <>
      <Header companyName="BarberTech" />
      <S.Calendar>
        <LeftSide />
        <S.RightSide>{children}</S.RightSide>
      </S.Calendar>
    </>
  )
}
