import { Event } from '../../components'
import { useGlobalContext } from '../../hooks'
import { Layout } from '..'
import * as S from './style'

export const Week = () => {
  const { date, weekNames, hourNames } = useGlobalContext()

  //<S.WeekHeaderDay>  colocar today para marcar o dia atual

  return (
    <Layout>
      <S.Header>
        {date.getWeekDays().map((day, index) => (
          <S.HeaderDay>
            <span>{weekNames[index]}</span>
            <span>{day}</span>
          </S.HeaderDay>
        ))}
      </S.Header>
      <S.Content>
        <S.Hours>
          {hourNames.map((hour) => (
            <span>{hour}</span>
          ))}
        </S.Hours>
        <S.Days>
          {Array.from({ length: 168 }, () => (
            <S.Day>
              <Event />
            </S.Day>
          ))}
        </S.Days>
      </S.Content>
    </Layout>
  )
}
