import { Event } from '../../components'
import { useGlobalContext } from '../../hooks'
import { Layout } from '..'
import * as S from './style'

export const Day = () => {
  const { date, weekNames, hourNames } = useGlobalContext()

  const currentDay = date.current.getDay()
  const currentDate = date.current.getDate()

  return (
    <Layout>
      <S.DayHeader>
        <S.DayHeaderDay>
          <span>{weekNames[currentDay]}</span>
          <span>{currentDate}</span>
        </S.DayHeaderDay>
      </S.DayHeader>
      <S.DayContent>
        {Array.from({ length: 24 }, (_, index) => (
          <S.DayHour key={index}>
            <span>{hourNames[index]}</span>
            <Event />
          </S.DayHour>
        ))}
      </S.DayContent>
    </Layout>
  )
}
